// // error-filter.ts
// import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
// import type { Request, Response } from 'express'
// import { DomainError } from '@cash-app/shared'

// @Catch()
// export class ErrorFilter implements ExceptionFilter {
//     catch(exception: unknown, host: ArgumentsHost) {
//         const ctx = host.switchToHttp()
//         const request = ctx.getRequest<Request>()
//         const response = ctx.getResponse<Response>()

//         const status =
//             exception instanceof HttpException
//                 ? exception.getStatus()
//                 : exception instanceof DomainError
//                   ? exception.statusCode
//                   : Array.isArray(exception) // se algum lugar ainda der throw [..]
//                     ? 422
//                     : HttpStatus.INTERNAL_SERVER_ERROR

//         const errors =
//             exception instanceof DomainError
//                 ? exception.errors
//                 : Array.isArray(exception)
//                   ? exception
//                   : this.extractHttpExceptionErrors(exception)

//         return response.status(status).json({
//             status,
//             date: new Date().toISOString(),
//             path: request.url,
//             method: request.method,
//             errors: this.normalizeErrors(errors, exception),
//         })
//     }

//     private extractHttpExceptionErrors(exception: unknown): any[] {
//         if (!(exception instanceof HttpException)) return []
//         const r = exception.getResponse()
//         if (typeof r === 'string') return [r]
//         const msg = (r as any)?.message
//         return Array.isArray(msg) ? msg : msg ? [msg] : [r]
//     }

//     private normalizeErrors(errors: any[], exception: unknown): any[] {
//         if (errors.length) return errors

//         const msg = (exception as any)?.message
//         if (msg) return [msg]

//         return ['Internal server error']
//     }
// }

import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'

@Catch(Error)
export class ErrorFilter implements ExceptionFilter {
    catch(e: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const request = ctx.getRequest<Request>()
        const response: any = ctx.getResponse<Response>()

        const status = (e as any).status ?? 400

        const resp: any = response.status(status)
        resp.json({
            status,
            data: new Date().toISOString(),
            url: request.url,
            errors: e.message,
        })
    }
}
