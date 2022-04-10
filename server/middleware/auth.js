import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        if (req.cookies.da_jwt) {
            const token = req.cookies.da_jwt;

            const isCustomAuth = token.length < 500;

            if (token && isCustomAuth) {
                const { id, exp } = jwt.verify(
                    token,
                    process.env.SECRET_STRING
                );

                if (exp < Date.now().valueOf() / 1000) {
                    return res
                        .cookie('da_jwt', '', {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'Strict',
                        })
                        .status(401)
                        .json({ message: 'JWT Expired' });
                }

                req.userId = id;
            } else {
                const data = jwt.decode(token);
                req.userId = data?.sub;
            }
            next();
        } else {
            // res.cookie('da_jwt', '', {
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === 'production',
            //     sameSite: 'Strict',
            // })
            //     .status(401)
            //     .json({ message: 'JWT Expired' });
            res.status(200).json({});
        }
    } catch (error) {
        res.cookie('da_jwt', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        })
            .status(401)
            .json({ message: 'JWT Expired' });
    }
};

export default auth;
