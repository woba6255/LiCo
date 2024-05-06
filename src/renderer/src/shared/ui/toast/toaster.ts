import { toast } from 'react-toastify'
import { t } from 'shared/i18n'

export const toaster = new Proxy(toast, {
    get(target, prop) {
        return (...args: unknown[]) => {
            const [message, options] = args
            const translatedMessage = typeof message === 'string' ? t(message) : message
            // @ts-expect-error
            return target[prop](translatedMessage, options)
        }
    }
}) as typeof toast
