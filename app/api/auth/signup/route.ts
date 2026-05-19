import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import {
    checkEmail,
    checkRequiredFields,
} from "@/validation/authValidater";
import { register } from "@/services/auth.service";
import { User } from "@/lib/types";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        console.log(data)
        // Required field validation
        const requiredResult = checkRequiredFields(data);

        if (!requiredResult.isValid) {
            return NextResponse.json(
                {
                    error: `${requiredResult.field} is required.`,
                },
                {
                    status: 400,
                }
            );
        }

        // Email validation
        const emailResult = checkEmail(data);

        if (!emailResult.isValid) {
            return NextResponse.json(
                {
                    error: "Invalid email.",
                },
                {
                    status: 400,
                }
            );
        }
        
        return await register(data);

    } catch (error) {
        console.error("Signup error:", error);

        return NextResponse.json(
            {
                error: "Internal server error.",
            },
            {
                status: 500,
            }
        );
    }
}