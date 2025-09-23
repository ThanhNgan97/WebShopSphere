import nodemailer from 'nodemailer';

export const sendMail = async (subject, receiver, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST,
            port: parseInt(process.env.NODEMAILER_PORT) || 587,
            secure: false, 
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD,
            },
        });

        const mailOptions = {
            from: `"ShopSphere" <${process.env.NODEMAILER_EMAIL}>`,
            to: receiver,
            subject: subject,
            html: body,
        };

        await transporter.sendMail(mailOptions);
        return { success: true };

    } catch (error) {
        return { success: false, message: error.message };
    }
};
