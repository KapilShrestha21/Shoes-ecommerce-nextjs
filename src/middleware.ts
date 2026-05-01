import { withAuth } from "next-auth/middleware"

export default withAuth({
     callbacks: {
        authorized: ({token, req}) =>{
            console.log('token', token);
            
            if(req.nextUrl.pathname.startsWith("/admin")) {   // this check url starting with /admin
                return token?.role === 'admin';               // if true it give access to /admin page
            } else {                                          // else says go to all other page except /admin
                return true 
            }
        }
     }
});


export const config = {
    matcher: ["/admin(/.*)?"],
}