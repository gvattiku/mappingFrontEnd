require "socket"
require "kemal"


# Receives data from the SBC on the robots
server = UDPSocket.new
server.bind("0.0.0.0", 1234)


# Kemal routes

get "/" do
  render "src/views/index.ecr", "src/views/layout.ecr"
end

get "/track-robots" do
  render "src/views/track_robots.ecr", "src/views/layout.ecr"
end


ws "/" do |socket|

  # Receive terrain data from the SBC on the robots,
  # Get cartesian coordinates from the ultrasonic
  # distance and two servo angles and send the cartesian
  # coordinates over the websocket

  loop do

    data, _client = server.receive(1024)

    begin
      r, theta, phi, pos_x, pos_y = data.chomp.split(",").map(&.to_f)
    rescue ArgumentError
      next
    rescue Errno
      puts "Received broken values"
      next
    end

    # Calibrating the servo position
    phi -= 35.0;

    # Converting degrees to radian
    phi *= Math::PI / 180
    theta *= Math::PI / 180

    x = r * Math.sin(phi) * Math.cos(theta)
    y = r * Math.sin(phi) * Math.sin(theta)
    z = r * Math.cos(phi)

    socket.send("#{x},#{y},#{z},#{pos_x},#{pos_y}")

  end
end


# Run the Kemal web server
Kemal.run
