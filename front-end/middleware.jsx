import { NextResponse } from "next/server";
import * as jose from 'jose';

const secret = process.env.JWT_SECRET;

export default async function Middleware(req){
    const { cookies } = req;

    const jwt = cookies.JWT_SECRET;
    const url = req.url;
    const currentUrl = req.nextUrl.clone()
    currentUrl.pathname = '/login'
    if (url.includes("/chat")){
        if (jwt === undefined){
            return NextResponse.redirect(currentUrl);
            //console.log(router.pathname)
        }

        try {
            await jose.jwtVerify(jwt,new TextEncoder().encode(secret));

            return NextResponse.next();
        } catch (e) {
            return NextResponse.redirect(currentUrl);
        }
    }

    return NextResponse.next();

}