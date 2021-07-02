export default function isDownload(uploadTime: Date, limitTime: number): boolean {
    if (limitTime === null) {
        return true;
    } else {
        const today = new Date();
        const fileTime = new Date(uploadTime);
        fileTime.setMinutes(fileTime.getMinutes() + limitTime);
        return fileTime.getTime() >= today.getTime();
    }
}