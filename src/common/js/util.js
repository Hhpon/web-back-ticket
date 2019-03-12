import Cookie from 'js-cookie'

const cookieKey = 'userName'

export function getCookie() {
  return Cookie.get(cookieKey)
}