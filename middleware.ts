import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute=createRouteMatcher([
"/sign-up",
"/sign-in",
"/",
"/home"

])

const isPublicApiRoute=createRouteMatcher([
  "/api/videos"
])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();    //somebody is acesing home or not
  const currentUrl = new URL(req.url);   //from the current url we are checkinng someone is acessing home or not 
 const isAccesingDashboard=currentUrl.pathname==="/home"
 const isApiRequest=currentUrl.pathname.startsWith("api")  //somenbody is accessign api or not
//not logged in
 if(userId&& isPublicRoute(req) && !isAccesingDashboard){
  return NextResponse.redirect(new URL("/home",req.url))
 }

 //  not logged in
 if(!userId){
  //not logged in and accessing protected route
  if(!isPublicRoute(req) && !isPublicApiRoute(req)){

  }
// if request is for api and user is not logged in
  if(isApiRequest  && !isPublicApiRoute(req)){
     return NextResponse.redirect(new URL("/signin",req.url))
  }
 }
return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)"
  ],
};
