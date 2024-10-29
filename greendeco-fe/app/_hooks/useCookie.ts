type CookieParams = {
	name: string
	value: string
	expireDay?: number
}
export function setCookie({ name, value }: CookieParams) {
	document.cookie = name + '=' + value + ';path=/'
}
