export default () => ({
    mailer: {
        host: process.env.MAILER_HOST || `smtp.gmail.com`,
        port: parseInt(process.env.MAILER_PORT, 10) || 465,
        secure: parseInt(process.env.MAILER_SECURE, 10) || true,
        user: process.env.MAILER_USER,
        password: process.env.MAILER_PASSWORD,
        from: process.env.MAILER_FROM,
    }
});
