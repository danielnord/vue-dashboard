// Used to generate unique widget ID:s
export default class Guid {
    // Simple implementation to create GUID like numbers, Does not follow RFC4122
    generate() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1)
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
    }
}
