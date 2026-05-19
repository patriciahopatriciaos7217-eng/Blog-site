import { NextRequest, NextResponse } from "next/server";

import { checkEmail, checkRequiredFields } from "@/validation/authValidater";
import { login } from "@/services/auth.service";


export const POST = async (request: NextRequest) => {
    const data = await request.json();

    console.log(data);

    //[require validation]
    const requiredFieldResult = checkRequiredFields(data);

    if (!requiredFieldResult.isValid) {
        NextResponse.json({ error: `${requiredFieldResult.field} is required.`, }, { status: 400 })
    }

    //[email validation]
    const emailValidateResult = checkEmail(data);

    if (!emailValidateResult.isValid) {
        NextResponse.json({ error: `${emailValidateResult.name} is not match email format.`, }, { status: 400 })
    }

    return await login(data);
}  