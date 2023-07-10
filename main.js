song = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
status1 = "";
status2 = "";
scoreleftWrist = 0;
scorerightWrist = 0;

function preload()
{
song = loadSound("music.mp3");
song2 = loadSound("music 2.mp3");
}

function setup()
{
    canvas = createCanvas(540, 300);
    canvas.position(370,200);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
}

function modelLoaded()
{
    console.log('Ready!');
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 540, 300);
    status1 = song.isPlaying();
    status2 = song2.isPlaying();

    if (scoreleftWrist > 0.2)
{
    fill("#FF0000");
    stroke("#FF0000");

    circle(leftWristX,leftWristY,20);
    song2.stop();    
    if (status1 = "false")
    {
    song.play();
    }
}

if (scorerightWrist > 0.2)
{
    fill("#FF0000");
    stroke("#FF0000");

    circle(rightWristX,rightWristY,20);
    song.stop();    
    if (status2 = "false")
    {
    song2.play();
    }
}
    
    
}

function music()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("Score of Left Wrist: " + scoreleftWrist);
    }
}