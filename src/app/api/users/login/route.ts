import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"


connect();

export async function POST(request: NextRequest) {
  try {
    console.log(request);
    const reqBody = await request.json();
    const {email,password} = reqBody;

    console.log(reqBody);

    // check if user exists
    const user = await User.findOne({email});

    if(!user)
    {
      return NextResponse.json({message: "User does not exist"},{status: 400});
    }

    // check if password is correct

    const validPassword = await bcryptjs.compare(password,user.password)
    
    if(!validPassword)
    {
      return NextResponse.json({error: "Invalid password"},{status:400})
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    }

    const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn: "1d"})

    const response = NextResponse.json({
      message: "Login success",
      success: true
    },{status: 200})
    
    response.cookies.set("token",token,{
      httpOnly: true
    })
    return response;
  } catch (error:any) {
    console.log("Login Error",error)
    return NextResponse.json({error: error.message},{status: 500})
    
  }
}