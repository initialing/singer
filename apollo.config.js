module.exports = {
    client: {
        service: {
            name: "singers",
            // GraphQL API 的 URL
            url: "http://localhost:3000/singer",
        },
        // 通过扩展名选择需要处理的文件
        includes: ["src/**/*.vue", "src/**/*.js"],
    },
};
