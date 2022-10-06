import nodemailer from 'nodemailer';
import myLogger from "../winstonLog/winston.js";


export async function sendMail(fullname, phone, address, role, username, dob, email) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.eEmail,
            pass: process.env.epassword
        }
    });
    myLogger.info(email)
    let mailOptions = {
        from: `ducnvph14435@fpt.edu.vn`,
        to: `${email}`,
        subject: 'Chào mừng bạn đến với SHOP Nhật Minh',
        text: `Dear ${fullname},

        Mình gửi lại thông tin account của bạn như sau:
        
        =============================
        Họ tên: ${fullname},
        SĐT: ${phone},
        Địa chỉ: ${address},
        Chức vụ: ${role},
        Username: ${username},
        Password: abc@123,
        Ngày sinh: ${dob},
        Email: ${email}
        =============================
        
        Lưu ý: Kiểm tra lại thông tin nếu có sai sót hãy trả lời lại email này.
        
        Best & Regard.
        SHOP Nhật Minh Team.`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return { statusCode: 500, error: 'ERROR', description: 'System busy!' };
        } else {
            return { statusCode: 200 };
        }
    });
}