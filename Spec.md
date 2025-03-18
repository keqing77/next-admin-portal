user_info

{"name": "J. David Smith","mail": "test@example.com","title": "Software Engineer","acl": "audit.readOnly,dashboard.readOnly,feedback.create,feedback.override,feedback.review,model.approval,model.review,model.simulation,prompt.approval,prompt.create,socre.override}

<!-- 没 cookie，redirect ，router middle ware -->

// 用户信息对象
const userInfo = {
name: "J. David Smith",
mail: "test@example.com",
title: "Software Engineer",
role: "Viewer,Analyst,Owner"
acl: "audit.readOnly,dashboard.readOnly,feedback.create,feedback.override,feedback.review,model.approval,model.review,model.simulation,prompt.approval,prompt.create,socre.override"
};

// 将对象转换为 JSON 字符串并进行 URI 编码
const cookieValue = encodeURIComponent(JSON.stringify(userInfo));

// 设置 Cookie（有效期 1 天）
const expires = new Date(Date.now() + 86400e3).toUTCString();
document.cookie = `user_info=${cookieValue}; expires=${expires}; path=/; Secure; SameSite=Lax`;
