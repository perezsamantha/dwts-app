import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        //const authHeader = String(req.headers['authorization'] || '');

        if (req.cookies.da_jwt !== null) {
            const token = req.cookies.da_jwt;

            // const token = req.headers.authorization.split(" ")[1];
            const isCustomAuth = token.length < 500;

            // let decodedData;

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
                        .status(403)
                        .json({ message: 'JWT Expired' });
                }

                req.userId = id;

                //decodedData = jwt.verify(token, process.env.SECRET_STRING);

                //req.userId = decodedData?.id;
            } else {
                const data = jwt.decode(token);
                req.userId = data?.sub;

                //decodedData = jwt.decode(token);

                //req.userId = decodedData?.sub;
            }
        } else {
            res.cookie('da_jwt', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
            })
                .status(403)
                .json({ message: 'JWT Expired' });
        }

        next();
    } catch (error) {
        res.cookie('da_jwt', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        })
            .status(403)
            .json({ message: 'JWT Expired' });
    }
};

export default auth; // auth will go in controllers eventually
