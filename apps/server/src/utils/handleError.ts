import { Prisma } from "@prisma/client"

export function handlePrismaError(err: unknown) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // The .code property can be accessed in a known error
    switch (err.code) {
      case 'P2002':
        return { status: 409, message: 'Unique constraint failed' };
      case 'P2025':
        return { status: 404, message: 'Record not found' };
      // Add more cases as needed
      default:
        return { status: 500, message: 'Database error' };
    }
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    return { status: 500, message: 'Unknown database error' };
  } else if (err instanceof Prisma.PrismaClientRustPanicError) {
    return { status: 500, message: 'Database connection error' };
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    return { status: 500, message: 'Prisma initialization error' };
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    return { status: 400, message: 'Validation error' };
  } else {
    return { status: 500, message: 'Unexpected error' };
  }
}
