import { cookies } from "next/headers";
import { NextResponse,NextRequest } from "next/server";
import * as jose from "jose";


const JWT_SECRET = process.env.JWT_SECRET as string;
export async function middleware(req: NextRequest){


    //check for cookie
    const cookie = cookies().get('Authorization');
    if(!cookie?.value){
        return NextResponse.redirect(new URL('/login',req.url));
    }

    //validate 
    const secret = new TextEncoder().encode(JWT_SECRET);
    const jwt = cookie.value;

    try{
        const {payload} = await jose.jwtVerify(jwt,secret,{});
        return NextResponse.next();
    }catch(error){
        return NextResponse.redirect(new URL('/login',req.url));
    }

}

export const config = {
    matcher: [
        '/api/logout',
        '/api/post',
        '/api/post/update',
        '/api/post/delete',
        
        '/api/user/update',
         '/uploadImages'
        ],
}