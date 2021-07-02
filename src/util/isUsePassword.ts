export default function isUsePassword(data: string): Boolean {
    if (data && data.indexOf(' ') === -1) {
        return true;
    } else {
        return false;
    }
}