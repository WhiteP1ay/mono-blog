/**
 * @module deviceUtils
 */

type DeviceType = 'mobile' | 'desktop';

const MOBILE_DEVICES = [
	'Android',
	'webOS',
	'iPhone',
	'iPad',
	'iPod',
	'BlackBerry',
	'Windows Phone',
	'IEMobile',
	'Opera Mini',
];

// 创建一个正则表达式，用于检测用户代理字符串是否包含移动设备信息
const MOBILE_USER_AGENT_REGEX = new RegExp(MOBILE_DEVICES.join('|'), 'i');

/**
 * 检测设备类型（移动端或桌面端）。
 *
 * @returns {DeviceType} - 返回检测到的设备类型：'mobile' 或 'desktop'
 */
export const detectDeviceType = (excludeMedia = false): DeviceType => {
	const userAgent: string =
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		navigator.userAgent || navigator.vendor || (window as any).opera;

	// 判断当前设备是否为移动设备
	const isMobileDevice: boolean = MOBILE_USER_AGENT_REGEX.test(userAgent);
	// 判断当前屏幕宽度是否为移动设备屏幕宽度
	const isMobileScreenWidth: boolean = window.matchMedia(
		'only screen and (max-width: 750px)',
	).matches;

	if (excludeMedia) return isMobileDevice ? 'mobile' : 'desktop';

	// 根据检测结果返回设备类型
	return isMobileDevice || isMobileScreenWidth ? 'mobile' : 'desktop';
};
