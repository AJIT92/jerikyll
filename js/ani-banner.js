var banner_width = 135;
var avatar_frame_left = 0;
var avatar_frame_top = 0;
var avatar_frame_width = 132;
var avatar_frame_height = 175;
var avatar_img_left = avatar_frame_left + 10;
var avatar_img_top = avatar_frame_top + 10;
var avatar_img_width = 112;
var avatar_img_height = 137;

function renderAvatar(params) {
	var rWidth;
	params.bannerContext.fillStyle = "#fff";
	params.bannerContext.fillRect(avatar_frame_left, avatar_frame_top, avatar_frame_width, avatar_frame_height);
	rWidth = Math.min(avatar_img_width, params.avatarBgImg.width+params.bgX);
	params.bannerContext.drawImage(params.avatarBgImg, -params.bgX, 0, rWidth, avatar_img_height, avatar_img_left, avatar_img_top, rWidth, avatar_img_height);
	if (params.bgX < params.avatarImg.width - params.avatarBgImg.width) {
		rWidth = avatar_img_width-params.avatarBgImg.width-params.bgX;
		params.bannerContext.drawImage(params.avatarBgImg, 0, 0, rWidth, avatar_img_height, avatar_img_left + avatar_img_width - rWidth, avatar_img_top, rWidth, avatar_img_height);
	}

	rWidth = Math.min(avatar_img_width, params.equationImg.width+params.bgEqX);
	params.bannerContext.drawImage(params.equationImg, -params.bgEqX, 0, rWidth, avatar_img_height, avatar_img_left, avatar_img_top + 20, rWidth, avatar_img_height - 20);
	if (params.bgEqX < params.avatarImg.width - params.equationImg.width) {
		rWidth = avatar_img_width-params.equationImg.width-params.bgEqX;
		params.bannerContext.drawImage(params.equationImg, 0, 0, rWidth, avatar_img_height, avatar_img_left + avatar_img_width - rWidth, avatar_img_top + 20, rWidth, avatar_img_height - 20);
	}
	params.bannerContext.drawImage(params.avatarImg, avatar_img_left, avatar_img_top);

	params.bgX -= 1;
	if (params.bgX <= -params.avatarBgImg.width) {
		params.bgX += params.avatarBgImg.width;
	}
	params.bgEqX -= 1.5;
	if (params.bgEqX <= -params.equationImg.width) {
		params.bgEqX += params.equationImg.width;
	}
	if (params.eyeLife > 0) {
		onCreepEyeRender(params);

		if (--params.eyeLife === 0) {
			onCreepEyeDone(params);
		}
	}
	if (params.browLife > 0) {
		onCreepBrowRender(params);

		if (--params.browLife === 0) {
			onCreepBrowDone(params);
		}
	}
}

function onRender(params) {
	renderAvatar(params);

	setTimeout(function() {onRender(params);}, 33);
}

function onCreepEyeStart(params) {
	params.eyeLife = 50;
}

function onCreepEyeDone(params) {
	setTimeout(function() {onCreepBrowStart(params);}, 500);
}

function onCreepEyeRender(params) {
	var mDx = params.mouse.x - params.avatarCenter.x;
	var mDy = params.mouse.y - params.avatarCenter.y;
	var mAngle = Math.atan2(mDy, mDx);
	var mDist = Math.sqrt(mDx*mDx + mDy*mDy);
	var translateRatio = Math.min(1, mDist / 50.0);
	var eyeDx = translateRatio * 2.5 * Math.cos(mAngle);
	var eyeDy = 1 + translateRatio * 2 * Math.sin(mAngle);
	params.bannerContext.drawImage(params.creepEyeImg, avatar_img_left + eyeDx, avatar_img_top + eyeDy);
	params.bannerContext.drawImage(params.creepMaskImg, avatar_img_left, avatar_img_top);
}

function onCreepBrowStart(params) {
	params.browLife = 3;
}

function onCreepBrowDone(params) {
	setTimeout(function() {onCreepEyeStart(params);}, Math.ceil(Math.random() * 2000) + 5000);
}

function onCreepBrowRender(params) {
	params.bannerContext.drawImage(params.browsImg, avatar_img_left, avatar_img_top);
}

$(document).ready(function() {
	var params = new Object();

	var header_banner = document.getElementById("header_banner");
	var bannerContext = header_banner.getContext("2d");
	var avatarImg = new Image();
	var avatarBgImg = new Image();
	var equationImg = new Image();
	var browsImg = new Image();
	var creepMaskImg = new Image();
	var creepEyeImg = new Image();

	var mouse = new Object();
	var avatarCenter = new Object();
	mouse.x = $(window).width() / 2;
	mouse.y = $(window).height() / 2;

	params.mouse = mouse;
	params.avatarCenter = avatarCenter;
	params.bgX = 0;
	params.bgEqX = 0;
	params.bannerContext = bannerContext;
	params.avatarImg = avatarImg;
	params.avatarBgImg = avatarBgImg;
	params.equationImg = equationImg;
	params.browsImg = browsImg;
	params.creepMaskImg = creepMaskImg;
	params.creepEyeImg = creepEyeImg;

	params.browLife = 0;
	params.eyeLife = 0;

	avatarImg.src = "/images/ani-banner/avatar.png";
	avatarBgImg.src = "/images/ani-banner/avatar_bg.png";
	equationImg.src = "/images/ani-banner/equations.png";
	browsImg.src = "/images/ani-banner/brows.png";
	creepMaskImg.src = "/images/ani-banner/mask.png";
	creepEyeImg.src = "/images/ani-banner/eye.png";

	$(document).mousemove(function(e) {
		mouse.x = e.pageX;
		mouse.y = e.pageY;

		var canvasPos = $("#header_banner").position();
		avatarCenter.x = canvasPos.left + avatar_img_left + 56;
		avatarCenter.y = canvasPos.top + avatar_img_top + 61;
	});

	setTimeout(function() {onRender(params);}, 33);
	setTimeout(function() {onCreepEyeStart(params);}, Math.ceil(Math.random() * 2000) + 5000);
});
