type JWTPayload = {
    'iss': 'https://api.starjin.top/users',
    'aud': 'https://api.starjin.top/users/endpoint',
    'username': string,
    'scope': string[],
    'amr': ['openid', 'email'],
    'jid': string
}