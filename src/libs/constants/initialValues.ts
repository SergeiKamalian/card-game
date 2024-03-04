export const REGISTRATION_INITIAL_VALUES = {
    name: '',
    password: ''
}
export const GAME_CREATING_INITIAL_VALUES = {
    gamersCount: 2,
    coins: 100,
    private: 'false'
}
export const GAME_JOINING_INITIAL_VALUES = {
    code: ''
}
export const PERSONAL_INFORMATION_INITIAL_VALUES = {
    ...REGISTRATION_INITIAL_VALUES,
    avatarURL: ''
}
export const MESSAGE_INITIAL_VALUES = {
    message: ''
}