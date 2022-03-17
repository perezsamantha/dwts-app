import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        //const authHeader = String(req.headers['authorization'] || '');

        if (req.cookies.token !== null) {
            const token = req.cookies.token;

            // const token = req.headers.authorization.split(" ")[1];
            const isCustomAuth = token.length < 500;

            // let decodedData;

            if (token && isCustomAuth) {
                const { id, exp } = jwt.verify(
                    token,
                    process.env.SECRET_STRING
                );

                if (exp < Date.now().valueOf() / 1000) {
                    return res.status(401).json({ error: 'Expired JWT' });
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
        }

        next();
    } catch (error) {
        console.log(error);
    }
    // try {
    //     const authHeader = String(req.headers['authorization'] || '');

    //     if (authHeader.startsWith('Bearer ')) {
    //         const token = authHeader.substring(7, authHeader.length);

    //         // const token = req.headers.authorization.split(" ")[1];
    //         const isCustomAuth = token.length < 500;

    //         // let decodedData;

    //         if (token && isCustomAuth) {
    //             const { id, exp } = jwt.verify(
    //                 token,
    //                 process.env.SECRET_STRING
    //             );

    //             if (exp < Date.now().valueOf() / 1000) {
    //                 return res.status(401).json({ error: 'Expired JWT' });
    //             }

    //             req.userId = id;

    //             //decodedData = jwt.verify(token, process.env.SECRET_STRING);

    //             //req.userId = decodedData?.id;
    //         } else {
    //             const data = jwt.decode(token);
    //             req.userId = data?.sub;

    //             //decodedData = jwt.decode(token);

    //             //req.userId = decodedData?.sub;
    //         }
    //     }

    //     next();
    // } catch (error) {
    //     console.log(error);
    // }
};

export default auth; // auth will go in controllers eventually
