const Canvas = require("canvas")
const Discord = require("discord.js")
const background = "https://i.imgur.com/8lWlHGt.png"

const dim = {
    height: 500,
    width: 1100,
    margin: 50
}

const av = {
    size: 256,
    x: 420,
    y: 80
}



const generateImage = async (member, server) => {
    let username = member.user.username
    let discrim = member.user.discriminator
    let avatarURL = member.user.displayAvatarURL({extension: "png", dynamic: false, size: av.size})

    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext("2d")

    // draw in the background
    const backimg = await Canvas.loadImage(background)
    ctx.drawImage(backimg, 0, 0)

    // draw black tinted box
    ctx.fillStyle = "rgba(0,0,0,0.8)"
    ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.height - 2 * dim.margin)

    const avimg = await Canvas.loadImage(avatarURL)
    ctx.save()
    
    // draw white border around the avatar
    const borderWidth = 10; // adjust the border width as needed
    const avatarCenterX = av.x + av.size / 2;
    const avatarCenterY = av.y + av.size / 2;
    ctx.beginPath();
    ctx.arc(avatarCenterX, avatarCenterY, av.size / 2 + borderWidth, 0, Math.PI * 2, true);
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(avatarCenterX, avatarCenterY, av.size / 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    // draw the avatar imagee
    ctx.drawImage(avimg, av.x, av.y)
    ctx.restore()

    // write in text
    ctx.fillStyle = "white"
    ctx.textAlign = "center"

    // // draw in Welcome
    // ctx.font = "50px Roboto"
    // ctx.fillText("Welcome", dim.width/2, dim.margin + 70)

    // draw in to the server
    ctx.font = "40px Roboto"
    ctx.fillText(username + " just joined the server", dim.width / 2, dim.height - dim.margin - 50)

    // draw member count
    const memberCount = server.memberCount.toString();
    ctx.font = "30px Roboto";
    ctx.fillStyle = "grey";
    ctx.fillText("Member #" + memberCount, dim.width / 2, dim.height - dim.margin - 15);

    const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), "welcome.png")
    return attachment
}

module.exports = generateImage