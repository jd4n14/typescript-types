const query = "SELECT * FROM client_orders co";

type Tokenizer<S extends string> =
    S extends '' ? [] :
    S extends `${infer F} ${infer E}` ? [F, ...Tokenizer<E>] : [S]

/**
 * type RemoveChar<S extends String, P extends String> = 
    S extends `${infer K}${infer R}` ? 
        K extends P ? RemoveChar<R, P> : `${K}${RemoveChar<R, P>}`
    : ''
 */

type RemoveChar<S extends String, P extends String> = 
    S extends `${infer K}${infer R}` ?
        K extends P ? RemoveChar<R,P> : `${K}${RemoveChar<R, P>}`
    : ''
    
const test: RemoveChar<Uppercase<typeof query>, 'E'> = 'SLCT * FROM CLINT_ORDRS CO'

type ExcludeRight<T extends string[]> = 
    T extends [infer F, ...infer J] ? 
        F extends string ? 
            Uppercase<F> extends 'FROM' ? F : 
                J extends string[] ? 
            ExcludeRight<J> : []
        : F 
    : never

const queryTokens: ExcludeRight<Tokenizer<typeof query>> = ''

type SelectFields<S extends Array<string>> =
    keyof S extends 'SELECT' ? [] : [...S]

const sqlTest = "SELECT a1, b2, b3, b4 FROM asp";

type SelectTest = SelectFields<Tokenizer<typeof sqlTest, ' '>>