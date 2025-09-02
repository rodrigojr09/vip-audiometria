
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model ResultadoType
 * 
 */
export type ResultadoType = $Result.DefaultSelection<Prisma.$ResultadoTypePayload>
/**
 * Model ViaOssea
 * 
 */
export type ViaOssea = $Result.DefaultSelection<Prisma.$ViaOsseaPayload>
/**
 * Model Pessoa
 * 
 */
export type Pessoa = $Result.DefaultSelection<Prisma.$PessoaPayload>
/**
 * Model Medica
 * 
 */
export type Medica = $Result.DefaultSelection<Prisma.$MedicaPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Pessoas
 * const pessoas = await prisma.pessoa.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Pessoas
   * const pessoas = await prisma.pessoa.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.pessoa`: Exposes CRUD operations for the **Pessoa** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pessoas
    * const pessoas = await prisma.pessoa.findMany()
    * ```
    */
  get pessoa(): Prisma.PessoaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.medica`: Exposes CRUD operations for the **Medica** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Medicas
    * const medicas = await prisma.medica.findMany()
    * ```
    */
  get medica(): Prisma.MedicaDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Pessoa: 'Pessoa',
    Medica: 'Medica'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "pessoa" | "medica"
      txIsolationLevel: never
    }
    model: {
      Pessoa: {
        payload: Prisma.$PessoaPayload<ExtArgs>
        fields: Prisma.PessoaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PessoaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PessoaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PessoaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PessoaPayload>
          }
          findFirst: {
            args: Prisma.PessoaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PessoaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PessoaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PessoaPayload>
          }
          findMany: {
            args: Prisma.PessoaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PessoaPayload>[]
          }
          create: {
            args: Prisma.PessoaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PessoaPayload>
          }
          createMany: {
            args: Prisma.PessoaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PessoaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PessoaPayload>
          }
          update: {
            args: Prisma.PessoaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PessoaPayload>
          }
          deleteMany: {
            args: Prisma.PessoaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PessoaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PessoaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PessoaPayload>
          }
          aggregate: {
            args: Prisma.PessoaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePessoa>
          }
          groupBy: {
            args: Prisma.PessoaGroupByArgs<ExtArgs>
            result: $Utils.Optional<PessoaGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.PessoaFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.PessoaAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.PessoaCountArgs<ExtArgs>
            result: $Utils.Optional<PessoaCountAggregateOutputType> | number
          }
        }
      }
      Medica: {
        payload: Prisma.$MedicaPayload<ExtArgs>
        fields: Prisma.MedicaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MedicaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MedicaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicaPayload>
          }
          findFirst: {
            args: Prisma.MedicaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MedicaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicaPayload>
          }
          findMany: {
            args: Prisma.MedicaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicaPayload>[]
          }
          create: {
            args: Prisma.MedicaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicaPayload>
          }
          createMany: {
            args: Prisma.MedicaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MedicaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicaPayload>
          }
          update: {
            args: Prisma.MedicaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicaPayload>
          }
          deleteMany: {
            args: Prisma.MedicaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MedicaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MedicaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicaPayload>
          }
          aggregate: {
            args: Prisma.MedicaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMedica>
          }
          groupBy: {
            args: Prisma.MedicaGroupByArgs<ExtArgs>
            result: $Utils.Optional<MedicaGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.MedicaFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.MedicaAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.MedicaCountArgs<ExtArgs>
            result: $Utils.Optional<MedicaCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    pessoa?: PessoaOmit
    medica?: MedicaOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model ResultadoType
   */





  export type ResultadoTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    od?: boolean
    d250?: boolean
    d500?: boolean
    d1000?: boolean
    d2000?: boolean
    d3000?: boolean
    d4000?: boolean
    d6000?: boolean
    d8000?: boolean
    oe?: boolean
    e250?: boolean
    e500?: boolean
    e1000?: boolean
    e2000?: boolean
    e3000?: boolean
    e4000?: boolean
    e6000?: boolean
    e8000?: boolean
    obs?: boolean
    ossea?: boolean | ViaOsseaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resultadoType"]>



  export type ResultadoTypeSelectScalar = {
    od?: boolean
    d250?: boolean
    d500?: boolean
    d1000?: boolean
    d2000?: boolean
    d3000?: boolean
    d4000?: boolean
    d6000?: boolean
    d8000?: boolean
    oe?: boolean
    e250?: boolean
    e500?: boolean
    e1000?: boolean
    e2000?: boolean
    e3000?: boolean
    e4000?: boolean
    e6000?: boolean
    e8000?: boolean
    obs?: boolean
  }

  export type ResultadoTypeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"od" | "d250" | "d500" | "d1000" | "d2000" | "d3000" | "d4000" | "d6000" | "d8000" | "oe" | "e250" | "e500" | "e1000" | "e2000" | "e3000" | "e4000" | "e6000" | "e8000" | "obs" | "ossea", ExtArgs["result"]["resultadoType"]>
  export type ResultadoTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ResultadoTypePayload = {
    name: "ResultadoType"
    objects: {}
    scalars: {
      od: string
      d250: string
      d500: string
      d1000: string
      d2000: string
      d3000: string
      d4000: string
      d6000: string
      d8000: string
      oe: string
      e250: string
      e500: string
      e1000: string
      e2000: string
      e3000: string
      e4000: string
      e6000: string
      e8000: string
      obs: string
    }
    composites: {
      ossea: Prisma.$ViaOsseaPayload | null
    }
  }

  type ResultadoTypeGetPayload<S extends boolean | null | undefined | ResultadoTypeDefaultArgs> = $Result.GetResult<Prisma.$ResultadoTypePayload, S>





  /**
   * Fields of the ResultadoType model
   */
  interface ResultadoTypeFieldRefs {
    readonly od: FieldRef<"ResultadoType", 'String'>
    readonly d250: FieldRef<"ResultadoType", 'String'>
    readonly d500: FieldRef<"ResultadoType", 'String'>
    readonly d1000: FieldRef<"ResultadoType", 'String'>
    readonly d2000: FieldRef<"ResultadoType", 'String'>
    readonly d3000: FieldRef<"ResultadoType", 'String'>
    readonly d4000: FieldRef<"ResultadoType", 'String'>
    readonly d6000: FieldRef<"ResultadoType", 'String'>
    readonly d8000: FieldRef<"ResultadoType", 'String'>
    readonly oe: FieldRef<"ResultadoType", 'String'>
    readonly e250: FieldRef<"ResultadoType", 'String'>
    readonly e500: FieldRef<"ResultadoType", 'String'>
    readonly e1000: FieldRef<"ResultadoType", 'String'>
    readonly e2000: FieldRef<"ResultadoType", 'String'>
    readonly e3000: FieldRef<"ResultadoType", 'String'>
    readonly e4000: FieldRef<"ResultadoType", 'String'>
    readonly e6000: FieldRef<"ResultadoType", 'String'>
    readonly e8000: FieldRef<"ResultadoType", 'String'>
    readonly obs: FieldRef<"ResultadoType", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ResultadoType without action
   */
  export type ResultadoTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResultadoType
     */
    select?: ResultadoTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResultadoType
     */
    omit?: ResultadoTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultadoTypeInclude<ExtArgs> | null
  }


  /**
   * Model ViaOssea
   */





  export type ViaOsseaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    od?: boolean
    d500?: boolean
    d1000?: boolean
    d2000?: boolean
    d3000?: boolean
    d4000?: boolean
    oe?: boolean
    e500?: boolean
    e1000?: boolean
    e2000?: boolean
    e3000?: boolean
    e4000?: boolean
  }, ExtArgs["result"]["viaOssea"]>



  export type ViaOsseaSelectScalar = {
    od?: boolean
    d500?: boolean
    d1000?: boolean
    d2000?: boolean
    d3000?: boolean
    d4000?: boolean
    oe?: boolean
    e500?: boolean
    e1000?: boolean
    e2000?: boolean
    e3000?: boolean
    e4000?: boolean
  }

  export type ViaOsseaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"od" | "d500" | "d1000" | "d2000" | "d3000" | "d4000" | "oe" | "e500" | "e1000" | "e2000" | "e3000" | "e4000", ExtArgs["result"]["viaOssea"]>

  export type $ViaOsseaPayload = {
    name: "ViaOssea"
    objects: {}
    scalars: {
      od: boolean
      d500: string | null
      d1000: string | null
      d2000: string | null
      d3000: string | null
      d4000: string | null
      oe: boolean
      e500: string | null
      e1000: string | null
      e2000: string | null
      e3000: string | null
      e4000: string | null
    }
    composites: {}
  }

  type ViaOsseaGetPayload<S extends boolean | null | undefined | ViaOsseaDefaultArgs> = $Result.GetResult<Prisma.$ViaOsseaPayload, S>





  /**
   * Fields of the ViaOssea model
   */
  interface ViaOsseaFieldRefs {
    readonly od: FieldRef<"ViaOssea", 'Boolean'>
    readonly d500: FieldRef<"ViaOssea", 'String'>
    readonly d1000: FieldRef<"ViaOssea", 'String'>
    readonly d2000: FieldRef<"ViaOssea", 'String'>
    readonly d3000: FieldRef<"ViaOssea", 'String'>
    readonly d4000: FieldRef<"ViaOssea", 'String'>
    readonly oe: FieldRef<"ViaOssea", 'Boolean'>
    readonly e500: FieldRef<"ViaOssea", 'String'>
    readonly e1000: FieldRef<"ViaOssea", 'String'>
    readonly e2000: FieldRef<"ViaOssea", 'String'>
    readonly e3000: FieldRef<"ViaOssea", 'String'>
    readonly e4000: FieldRef<"ViaOssea", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ViaOssea without action
   */
  export type ViaOsseaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ViaOssea
     */
    select?: ViaOsseaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ViaOssea
     */
    omit?: ViaOsseaOmit<ExtArgs> | null
  }


  /**
   * Model Pessoa
   */

  export type AggregatePessoa = {
    _count: PessoaCountAggregateOutputType | null
    _min: PessoaMinAggregateOutputType | null
    _max: PessoaMaxAggregateOutputType | null
  }

  export type PessoaMinAggregateOutputType = {
    id: string | null
    nome: string | null
    cpf: string | null
    dataNascimento: string | null
    dataExame: string | null
    tipoExame: string | null
    funcao: string | null
    empresa: string | null
    responsavel: string | null
    documento: string | null
  }

  export type PessoaMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    cpf: string | null
    dataNascimento: string | null
    dataExame: string | null
    tipoExame: string | null
    funcao: string | null
    empresa: string | null
    responsavel: string | null
    documento: string | null
  }

  export type PessoaCountAggregateOutputType = {
    id: number
    nome: number
    cpf: number
    dataNascimento: number
    dataExame: number
    tipoExame: number
    funcao: number
    empresa: number
    responsavel: number
    documento: number
    _all: number
  }


  export type PessoaMinAggregateInputType = {
    id?: true
    nome?: true
    cpf?: true
    dataNascimento?: true
    dataExame?: true
    tipoExame?: true
    funcao?: true
    empresa?: true
    responsavel?: true
    documento?: true
  }

  export type PessoaMaxAggregateInputType = {
    id?: true
    nome?: true
    cpf?: true
    dataNascimento?: true
    dataExame?: true
    tipoExame?: true
    funcao?: true
    empresa?: true
    responsavel?: true
    documento?: true
  }

  export type PessoaCountAggregateInputType = {
    id?: true
    nome?: true
    cpf?: true
    dataNascimento?: true
    dataExame?: true
    tipoExame?: true
    funcao?: true
    empresa?: true
    responsavel?: true
    documento?: true
    _all?: true
  }

  export type PessoaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pessoa to aggregate.
     */
    where?: PessoaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pessoas to fetch.
     */
    orderBy?: PessoaOrderByWithRelationInput | PessoaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PessoaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pessoas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pessoas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pessoas
    **/
    _count?: true | PessoaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PessoaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PessoaMaxAggregateInputType
  }

  export type GetPessoaAggregateType<T extends PessoaAggregateArgs> = {
        [P in keyof T & keyof AggregatePessoa]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePessoa[P]>
      : GetScalarType<T[P], AggregatePessoa[P]>
  }




  export type PessoaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PessoaWhereInput
    orderBy?: PessoaOrderByWithAggregationInput | PessoaOrderByWithAggregationInput[]
    by: PessoaScalarFieldEnum[] | PessoaScalarFieldEnum
    having?: PessoaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PessoaCountAggregateInputType | true
    _min?: PessoaMinAggregateInputType
    _max?: PessoaMaxAggregateInputType
  }

  export type PessoaGroupByOutputType = {
    id: string
    nome: string
    cpf: string
    dataNascimento: string
    dataExame: string
    tipoExame: string
    funcao: string
    empresa: string
    responsavel: string
    documento: string
    _count: PessoaCountAggregateOutputType | null
    _min: PessoaMinAggregateOutputType | null
    _max: PessoaMaxAggregateOutputType | null
  }

  type GetPessoaGroupByPayload<T extends PessoaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PessoaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PessoaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PessoaGroupByOutputType[P]>
            : GetScalarType<T[P], PessoaGroupByOutputType[P]>
        }
      >
    >


  export type PessoaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    cpf?: boolean
    dataNascimento?: boolean
    dataExame?: boolean
    tipoExame?: boolean
    funcao?: boolean
    empresa?: boolean
    responsavel?: boolean
    documento?: boolean
    resultados?: boolean | ResultadoTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pessoa"]>



  export type PessoaSelectScalar = {
    id?: boolean
    nome?: boolean
    cpf?: boolean
    dataNascimento?: boolean
    dataExame?: boolean
    tipoExame?: boolean
    funcao?: boolean
    empresa?: boolean
    responsavel?: boolean
    documento?: boolean
  }

  export type PessoaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "cpf" | "dataNascimento" | "dataExame" | "tipoExame" | "funcao" | "empresa" | "responsavel" | "documento" | "resultados", ExtArgs["result"]["pessoa"]>
  export type PessoaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PessoaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pessoa"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      cpf: string
      dataNascimento: string
      dataExame: string
      tipoExame: string
      funcao: string
      empresa: string
      responsavel: string
      documento: string
    }, ExtArgs["result"]["pessoa"]>
    composites: {
      resultados: Prisma.$ResultadoTypePayload | null
    }
  }

  type PessoaGetPayload<S extends boolean | null | undefined | PessoaDefaultArgs> = $Result.GetResult<Prisma.$PessoaPayload, S>

  type PessoaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PessoaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PessoaCountAggregateInputType | true
    }

  export interface PessoaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pessoa'], meta: { name: 'Pessoa' } }
    /**
     * Find zero or one Pessoa that matches the filter.
     * @param {PessoaFindUniqueArgs} args - Arguments to find a Pessoa
     * @example
     * // Get one Pessoa
     * const pessoa = await prisma.pessoa.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PessoaFindUniqueArgs>(args: SelectSubset<T, PessoaFindUniqueArgs<ExtArgs>>): Prisma__PessoaClient<$Result.GetResult<Prisma.$PessoaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pessoa that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PessoaFindUniqueOrThrowArgs} args - Arguments to find a Pessoa
     * @example
     * // Get one Pessoa
     * const pessoa = await prisma.pessoa.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PessoaFindUniqueOrThrowArgs>(args: SelectSubset<T, PessoaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PessoaClient<$Result.GetResult<Prisma.$PessoaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pessoa that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PessoaFindFirstArgs} args - Arguments to find a Pessoa
     * @example
     * // Get one Pessoa
     * const pessoa = await prisma.pessoa.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PessoaFindFirstArgs>(args?: SelectSubset<T, PessoaFindFirstArgs<ExtArgs>>): Prisma__PessoaClient<$Result.GetResult<Prisma.$PessoaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pessoa that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PessoaFindFirstOrThrowArgs} args - Arguments to find a Pessoa
     * @example
     * // Get one Pessoa
     * const pessoa = await prisma.pessoa.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PessoaFindFirstOrThrowArgs>(args?: SelectSubset<T, PessoaFindFirstOrThrowArgs<ExtArgs>>): Prisma__PessoaClient<$Result.GetResult<Prisma.$PessoaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pessoas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PessoaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pessoas
     * const pessoas = await prisma.pessoa.findMany()
     * 
     * // Get first 10 Pessoas
     * const pessoas = await prisma.pessoa.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pessoaWithIdOnly = await prisma.pessoa.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PessoaFindManyArgs>(args?: SelectSubset<T, PessoaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PessoaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pessoa.
     * @param {PessoaCreateArgs} args - Arguments to create a Pessoa.
     * @example
     * // Create one Pessoa
     * const Pessoa = await prisma.pessoa.create({
     *   data: {
     *     // ... data to create a Pessoa
     *   }
     * })
     * 
     */
    create<T extends PessoaCreateArgs>(args: SelectSubset<T, PessoaCreateArgs<ExtArgs>>): Prisma__PessoaClient<$Result.GetResult<Prisma.$PessoaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pessoas.
     * @param {PessoaCreateManyArgs} args - Arguments to create many Pessoas.
     * @example
     * // Create many Pessoas
     * const pessoa = await prisma.pessoa.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PessoaCreateManyArgs>(args?: SelectSubset<T, PessoaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Pessoa.
     * @param {PessoaDeleteArgs} args - Arguments to delete one Pessoa.
     * @example
     * // Delete one Pessoa
     * const Pessoa = await prisma.pessoa.delete({
     *   where: {
     *     // ... filter to delete one Pessoa
     *   }
     * })
     * 
     */
    delete<T extends PessoaDeleteArgs>(args: SelectSubset<T, PessoaDeleteArgs<ExtArgs>>): Prisma__PessoaClient<$Result.GetResult<Prisma.$PessoaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pessoa.
     * @param {PessoaUpdateArgs} args - Arguments to update one Pessoa.
     * @example
     * // Update one Pessoa
     * const pessoa = await prisma.pessoa.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PessoaUpdateArgs>(args: SelectSubset<T, PessoaUpdateArgs<ExtArgs>>): Prisma__PessoaClient<$Result.GetResult<Prisma.$PessoaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pessoas.
     * @param {PessoaDeleteManyArgs} args - Arguments to filter Pessoas to delete.
     * @example
     * // Delete a few Pessoas
     * const { count } = await prisma.pessoa.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PessoaDeleteManyArgs>(args?: SelectSubset<T, PessoaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pessoas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PessoaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pessoas
     * const pessoa = await prisma.pessoa.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PessoaUpdateManyArgs>(args: SelectSubset<T, PessoaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Pessoa.
     * @param {PessoaUpsertArgs} args - Arguments to update or create a Pessoa.
     * @example
     * // Update or create a Pessoa
     * const pessoa = await prisma.pessoa.upsert({
     *   create: {
     *     // ... data to create a Pessoa
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pessoa we want to update
     *   }
     * })
     */
    upsert<T extends PessoaUpsertArgs>(args: SelectSubset<T, PessoaUpsertArgs<ExtArgs>>): Prisma__PessoaClient<$Result.GetResult<Prisma.$PessoaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pessoas that matches the filter.
     * @param {PessoaFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const pessoa = await prisma.pessoa.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: PessoaFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Pessoa.
     * @param {PessoaAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const pessoa = await prisma.pessoa.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: PessoaAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Pessoas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PessoaCountArgs} args - Arguments to filter Pessoas to count.
     * @example
     * // Count the number of Pessoas
     * const count = await prisma.pessoa.count({
     *   where: {
     *     // ... the filter for the Pessoas we want to count
     *   }
     * })
    **/
    count<T extends PessoaCountArgs>(
      args?: Subset<T, PessoaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PessoaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pessoa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PessoaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PessoaAggregateArgs>(args: Subset<T, PessoaAggregateArgs>): Prisma.PrismaPromise<GetPessoaAggregateType<T>>

    /**
     * Group by Pessoa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PessoaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PessoaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PessoaGroupByArgs['orderBy'] }
        : { orderBy?: PessoaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PessoaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPessoaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pessoa model
   */
  readonly fields: PessoaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pessoa.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PessoaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pessoa model
   */
  interface PessoaFieldRefs {
    readonly id: FieldRef<"Pessoa", 'String'>
    readonly nome: FieldRef<"Pessoa", 'String'>
    readonly cpf: FieldRef<"Pessoa", 'String'>
    readonly dataNascimento: FieldRef<"Pessoa", 'String'>
    readonly dataExame: FieldRef<"Pessoa", 'String'>
    readonly tipoExame: FieldRef<"Pessoa", 'String'>
    readonly funcao: FieldRef<"Pessoa", 'String'>
    readonly empresa: FieldRef<"Pessoa", 'String'>
    readonly responsavel: FieldRef<"Pessoa", 'String'>
    readonly documento: FieldRef<"Pessoa", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Pessoa findUnique
   */
  export type PessoaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pessoa
     */
    select?: PessoaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pessoa
     */
    omit?: PessoaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PessoaInclude<ExtArgs> | null
    /**
     * Filter, which Pessoa to fetch.
     */
    where: PessoaWhereUniqueInput
  }

  /**
   * Pessoa findUniqueOrThrow
   */
  export type PessoaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pessoa
     */
    select?: PessoaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pessoa
     */
    omit?: PessoaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PessoaInclude<ExtArgs> | null
    /**
     * Filter, which Pessoa to fetch.
     */
    where: PessoaWhereUniqueInput
  }

  /**
   * Pessoa findFirst
   */
  export type PessoaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pessoa
     */
    select?: PessoaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pessoa
     */
    omit?: PessoaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PessoaInclude<ExtArgs> | null
    /**
     * Filter, which Pessoa to fetch.
     */
    where?: PessoaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pessoas to fetch.
     */
    orderBy?: PessoaOrderByWithRelationInput | PessoaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pessoas.
     */
    cursor?: PessoaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pessoas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pessoas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pessoas.
     */
    distinct?: PessoaScalarFieldEnum | PessoaScalarFieldEnum[]
  }

  /**
   * Pessoa findFirstOrThrow
   */
  export type PessoaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pessoa
     */
    select?: PessoaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pessoa
     */
    omit?: PessoaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PessoaInclude<ExtArgs> | null
    /**
     * Filter, which Pessoa to fetch.
     */
    where?: PessoaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pessoas to fetch.
     */
    orderBy?: PessoaOrderByWithRelationInput | PessoaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pessoas.
     */
    cursor?: PessoaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pessoas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pessoas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pessoas.
     */
    distinct?: PessoaScalarFieldEnum | PessoaScalarFieldEnum[]
  }

  /**
   * Pessoa findMany
   */
  export type PessoaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pessoa
     */
    select?: PessoaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pessoa
     */
    omit?: PessoaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PessoaInclude<ExtArgs> | null
    /**
     * Filter, which Pessoas to fetch.
     */
    where?: PessoaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pessoas to fetch.
     */
    orderBy?: PessoaOrderByWithRelationInput | PessoaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pessoas.
     */
    cursor?: PessoaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pessoas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pessoas.
     */
    skip?: number
    distinct?: PessoaScalarFieldEnum | PessoaScalarFieldEnum[]
  }

  /**
   * Pessoa create
   */
  export type PessoaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pessoa
     */
    select?: PessoaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pessoa
     */
    omit?: PessoaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PessoaInclude<ExtArgs> | null
    /**
     * The data needed to create a Pessoa.
     */
    data: XOR<PessoaCreateInput, PessoaUncheckedCreateInput>
  }

  /**
   * Pessoa createMany
   */
  export type PessoaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pessoas.
     */
    data: PessoaCreateManyInput | PessoaCreateManyInput[]
  }

  /**
   * Pessoa update
   */
  export type PessoaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pessoa
     */
    select?: PessoaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pessoa
     */
    omit?: PessoaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PessoaInclude<ExtArgs> | null
    /**
     * The data needed to update a Pessoa.
     */
    data: XOR<PessoaUpdateInput, PessoaUncheckedUpdateInput>
    /**
     * Choose, which Pessoa to update.
     */
    where: PessoaWhereUniqueInput
  }

  /**
   * Pessoa updateMany
   */
  export type PessoaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pessoas.
     */
    data: XOR<PessoaUpdateManyMutationInput, PessoaUncheckedUpdateManyInput>
    /**
     * Filter which Pessoas to update
     */
    where?: PessoaWhereInput
    /**
     * Limit how many Pessoas to update.
     */
    limit?: number
  }

  /**
   * Pessoa upsert
   */
  export type PessoaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pessoa
     */
    select?: PessoaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pessoa
     */
    omit?: PessoaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PessoaInclude<ExtArgs> | null
    /**
     * The filter to search for the Pessoa to update in case it exists.
     */
    where: PessoaWhereUniqueInput
    /**
     * In case the Pessoa found by the `where` argument doesn't exist, create a new Pessoa with this data.
     */
    create: XOR<PessoaCreateInput, PessoaUncheckedCreateInput>
    /**
     * In case the Pessoa was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PessoaUpdateInput, PessoaUncheckedUpdateInput>
  }

  /**
   * Pessoa delete
   */
  export type PessoaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pessoa
     */
    select?: PessoaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pessoa
     */
    omit?: PessoaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PessoaInclude<ExtArgs> | null
    /**
     * Filter which Pessoa to delete.
     */
    where: PessoaWhereUniqueInput
  }

  /**
   * Pessoa deleteMany
   */
  export type PessoaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pessoas to delete
     */
    where?: PessoaWhereInput
    /**
     * Limit how many Pessoas to delete.
     */
    limit?: number
  }

  /**
   * Pessoa findRaw
   */
  export type PessoaFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Pessoa aggregateRaw
   */
  export type PessoaAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Pessoa without action
   */
  export type PessoaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pessoa
     */
    select?: PessoaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pessoa
     */
    omit?: PessoaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PessoaInclude<ExtArgs> | null
  }


  /**
   * Model Medica
   */

  export type AggregateMedica = {
    _count: MedicaCountAggregateOutputType | null
    _min: MedicaMinAggregateOutputType | null
    _max: MedicaMaxAggregateOutputType | null
  }

  export type MedicaMinAggregateOutputType = {
    id: string | null
    nome: string | null
    documento: string | null
  }

  export type MedicaMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    documento: string | null
  }

  export type MedicaCountAggregateOutputType = {
    id: number
    nome: number
    documento: number
    _all: number
  }


  export type MedicaMinAggregateInputType = {
    id?: true
    nome?: true
    documento?: true
  }

  export type MedicaMaxAggregateInputType = {
    id?: true
    nome?: true
    documento?: true
  }

  export type MedicaCountAggregateInputType = {
    id?: true
    nome?: true
    documento?: true
    _all?: true
  }

  export type MedicaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Medica to aggregate.
     */
    where?: MedicaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Medicas to fetch.
     */
    orderBy?: MedicaOrderByWithRelationInput | MedicaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MedicaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Medicas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Medicas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Medicas
    **/
    _count?: true | MedicaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MedicaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MedicaMaxAggregateInputType
  }

  export type GetMedicaAggregateType<T extends MedicaAggregateArgs> = {
        [P in keyof T & keyof AggregateMedica]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMedica[P]>
      : GetScalarType<T[P], AggregateMedica[P]>
  }




  export type MedicaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedicaWhereInput
    orderBy?: MedicaOrderByWithAggregationInput | MedicaOrderByWithAggregationInput[]
    by: MedicaScalarFieldEnum[] | MedicaScalarFieldEnum
    having?: MedicaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MedicaCountAggregateInputType | true
    _min?: MedicaMinAggregateInputType
    _max?: MedicaMaxAggregateInputType
  }

  export type MedicaGroupByOutputType = {
    id: string
    nome: string
    documento: string
    _count: MedicaCountAggregateOutputType | null
    _min: MedicaMinAggregateOutputType | null
    _max: MedicaMaxAggregateOutputType | null
  }

  type GetMedicaGroupByPayload<T extends MedicaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MedicaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MedicaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MedicaGroupByOutputType[P]>
            : GetScalarType<T[P], MedicaGroupByOutputType[P]>
        }
      >
    >


  export type MedicaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    documento?: boolean
  }, ExtArgs["result"]["medica"]>



  export type MedicaSelectScalar = {
    id?: boolean
    nome?: boolean
    documento?: boolean
  }

  export type MedicaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "documento", ExtArgs["result"]["medica"]>

  export type $MedicaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Medica"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      documento: string
    }, ExtArgs["result"]["medica"]>
    composites: {}
  }

  type MedicaGetPayload<S extends boolean | null | undefined | MedicaDefaultArgs> = $Result.GetResult<Prisma.$MedicaPayload, S>

  type MedicaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MedicaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MedicaCountAggregateInputType | true
    }

  export interface MedicaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Medica'], meta: { name: 'Medica' } }
    /**
     * Find zero or one Medica that matches the filter.
     * @param {MedicaFindUniqueArgs} args - Arguments to find a Medica
     * @example
     * // Get one Medica
     * const medica = await prisma.medica.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MedicaFindUniqueArgs>(args: SelectSubset<T, MedicaFindUniqueArgs<ExtArgs>>): Prisma__MedicaClient<$Result.GetResult<Prisma.$MedicaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Medica that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MedicaFindUniqueOrThrowArgs} args - Arguments to find a Medica
     * @example
     * // Get one Medica
     * const medica = await prisma.medica.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MedicaFindUniqueOrThrowArgs>(args: SelectSubset<T, MedicaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MedicaClient<$Result.GetResult<Prisma.$MedicaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Medica that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicaFindFirstArgs} args - Arguments to find a Medica
     * @example
     * // Get one Medica
     * const medica = await prisma.medica.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MedicaFindFirstArgs>(args?: SelectSubset<T, MedicaFindFirstArgs<ExtArgs>>): Prisma__MedicaClient<$Result.GetResult<Prisma.$MedicaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Medica that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicaFindFirstOrThrowArgs} args - Arguments to find a Medica
     * @example
     * // Get one Medica
     * const medica = await prisma.medica.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MedicaFindFirstOrThrowArgs>(args?: SelectSubset<T, MedicaFindFirstOrThrowArgs<ExtArgs>>): Prisma__MedicaClient<$Result.GetResult<Prisma.$MedicaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Medicas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Medicas
     * const medicas = await prisma.medica.findMany()
     * 
     * // Get first 10 Medicas
     * const medicas = await prisma.medica.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const medicaWithIdOnly = await prisma.medica.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MedicaFindManyArgs>(args?: SelectSubset<T, MedicaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Medica.
     * @param {MedicaCreateArgs} args - Arguments to create a Medica.
     * @example
     * // Create one Medica
     * const Medica = await prisma.medica.create({
     *   data: {
     *     // ... data to create a Medica
     *   }
     * })
     * 
     */
    create<T extends MedicaCreateArgs>(args: SelectSubset<T, MedicaCreateArgs<ExtArgs>>): Prisma__MedicaClient<$Result.GetResult<Prisma.$MedicaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Medicas.
     * @param {MedicaCreateManyArgs} args - Arguments to create many Medicas.
     * @example
     * // Create many Medicas
     * const medica = await prisma.medica.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MedicaCreateManyArgs>(args?: SelectSubset<T, MedicaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Medica.
     * @param {MedicaDeleteArgs} args - Arguments to delete one Medica.
     * @example
     * // Delete one Medica
     * const Medica = await prisma.medica.delete({
     *   where: {
     *     // ... filter to delete one Medica
     *   }
     * })
     * 
     */
    delete<T extends MedicaDeleteArgs>(args: SelectSubset<T, MedicaDeleteArgs<ExtArgs>>): Prisma__MedicaClient<$Result.GetResult<Prisma.$MedicaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Medica.
     * @param {MedicaUpdateArgs} args - Arguments to update one Medica.
     * @example
     * // Update one Medica
     * const medica = await prisma.medica.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MedicaUpdateArgs>(args: SelectSubset<T, MedicaUpdateArgs<ExtArgs>>): Prisma__MedicaClient<$Result.GetResult<Prisma.$MedicaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Medicas.
     * @param {MedicaDeleteManyArgs} args - Arguments to filter Medicas to delete.
     * @example
     * // Delete a few Medicas
     * const { count } = await prisma.medica.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MedicaDeleteManyArgs>(args?: SelectSubset<T, MedicaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Medicas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Medicas
     * const medica = await prisma.medica.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MedicaUpdateManyArgs>(args: SelectSubset<T, MedicaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Medica.
     * @param {MedicaUpsertArgs} args - Arguments to update or create a Medica.
     * @example
     * // Update or create a Medica
     * const medica = await prisma.medica.upsert({
     *   create: {
     *     // ... data to create a Medica
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Medica we want to update
     *   }
     * })
     */
    upsert<T extends MedicaUpsertArgs>(args: SelectSubset<T, MedicaUpsertArgs<ExtArgs>>): Prisma__MedicaClient<$Result.GetResult<Prisma.$MedicaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Medicas that matches the filter.
     * @param {MedicaFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const medica = await prisma.medica.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: MedicaFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Medica.
     * @param {MedicaAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const medica = await prisma.medica.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: MedicaAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Medicas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicaCountArgs} args - Arguments to filter Medicas to count.
     * @example
     * // Count the number of Medicas
     * const count = await prisma.medica.count({
     *   where: {
     *     // ... the filter for the Medicas we want to count
     *   }
     * })
    **/
    count<T extends MedicaCountArgs>(
      args?: Subset<T, MedicaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MedicaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Medica.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MedicaAggregateArgs>(args: Subset<T, MedicaAggregateArgs>): Prisma.PrismaPromise<GetMedicaAggregateType<T>>

    /**
     * Group by Medica.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MedicaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MedicaGroupByArgs['orderBy'] }
        : { orderBy?: MedicaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MedicaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMedicaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Medica model
   */
  readonly fields: MedicaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Medica.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MedicaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Medica model
   */
  interface MedicaFieldRefs {
    readonly id: FieldRef<"Medica", 'String'>
    readonly nome: FieldRef<"Medica", 'String'>
    readonly documento: FieldRef<"Medica", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Medica findUnique
   */
  export type MedicaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medica
     */
    select?: MedicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medica
     */
    omit?: MedicaOmit<ExtArgs> | null
    /**
     * Filter, which Medica to fetch.
     */
    where: MedicaWhereUniqueInput
  }

  /**
   * Medica findUniqueOrThrow
   */
  export type MedicaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medica
     */
    select?: MedicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medica
     */
    omit?: MedicaOmit<ExtArgs> | null
    /**
     * Filter, which Medica to fetch.
     */
    where: MedicaWhereUniqueInput
  }

  /**
   * Medica findFirst
   */
  export type MedicaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medica
     */
    select?: MedicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medica
     */
    omit?: MedicaOmit<ExtArgs> | null
    /**
     * Filter, which Medica to fetch.
     */
    where?: MedicaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Medicas to fetch.
     */
    orderBy?: MedicaOrderByWithRelationInput | MedicaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Medicas.
     */
    cursor?: MedicaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Medicas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Medicas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Medicas.
     */
    distinct?: MedicaScalarFieldEnum | MedicaScalarFieldEnum[]
  }

  /**
   * Medica findFirstOrThrow
   */
  export type MedicaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medica
     */
    select?: MedicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medica
     */
    omit?: MedicaOmit<ExtArgs> | null
    /**
     * Filter, which Medica to fetch.
     */
    where?: MedicaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Medicas to fetch.
     */
    orderBy?: MedicaOrderByWithRelationInput | MedicaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Medicas.
     */
    cursor?: MedicaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Medicas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Medicas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Medicas.
     */
    distinct?: MedicaScalarFieldEnum | MedicaScalarFieldEnum[]
  }

  /**
   * Medica findMany
   */
  export type MedicaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medica
     */
    select?: MedicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medica
     */
    omit?: MedicaOmit<ExtArgs> | null
    /**
     * Filter, which Medicas to fetch.
     */
    where?: MedicaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Medicas to fetch.
     */
    orderBy?: MedicaOrderByWithRelationInput | MedicaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Medicas.
     */
    cursor?: MedicaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Medicas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Medicas.
     */
    skip?: number
    distinct?: MedicaScalarFieldEnum | MedicaScalarFieldEnum[]
  }

  /**
   * Medica create
   */
  export type MedicaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medica
     */
    select?: MedicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medica
     */
    omit?: MedicaOmit<ExtArgs> | null
    /**
     * The data needed to create a Medica.
     */
    data: XOR<MedicaCreateInput, MedicaUncheckedCreateInput>
  }

  /**
   * Medica createMany
   */
  export type MedicaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Medicas.
     */
    data: MedicaCreateManyInput | MedicaCreateManyInput[]
  }

  /**
   * Medica update
   */
  export type MedicaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medica
     */
    select?: MedicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medica
     */
    omit?: MedicaOmit<ExtArgs> | null
    /**
     * The data needed to update a Medica.
     */
    data: XOR<MedicaUpdateInput, MedicaUncheckedUpdateInput>
    /**
     * Choose, which Medica to update.
     */
    where: MedicaWhereUniqueInput
  }

  /**
   * Medica updateMany
   */
  export type MedicaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Medicas.
     */
    data: XOR<MedicaUpdateManyMutationInput, MedicaUncheckedUpdateManyInput>
    /**
     * Filter which Medicas to update
     */
    where?: MedicaWhereInput
    /**
     * Limit how many Medicas to update.
     */
    limit?: number
  }

  /**
   * Medica upsert
   */
  export type MedicaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medica
     */
    select?: MedicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medica
     */
    omit?: MedicaOmit<ExtArgs> | null
    /**
     * The filter to search for the Medica to update in case it exists.
     */
    where: MedicaWhereUniqueInput
    /**
     * In case the Medica found by the `where` argument doesn't exist, create a new Medica with this data.
     */
    create: XOR<MedicaCreateInput, MedicaUncheckedCreateInput>
    /**
     * In case the Medica was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MedicaUpdateInput, MedicaUncheckedUpdateInput>
  }

  /**
   * Medica delete
   */
  export type MedicaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medica
     */
    select?: MedicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medica
     */
    omit?: MedicaOmit<ExtArgs> | null
    /**
     * Filter which Medica to delete.
     */
    where: MedicaWhereUniqueInput
  }

  /**
   * Medica deleteMany
   */
  export type MedicaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Medicas to delete
     */
    where?: MedicaWhereInput
    /**
     * Limit how many Medicas to delete.
     */
    limit?: number
  }

  /**
   * Medica findRaw
   */
  export type MedicaFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Medica aggregateRaw
   */
  export type MedicaAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Medica without action
   */
  export type MedicaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medica
     */
    select?: MedicaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Medica
     */
    omit?: MedicaOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const PessoaScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    cpf: 'cpf',
    dataNascimento: 'dataNascimento',
    dataExame: 'dataExame',
    tipoExame: 'tipoExame',
    funcao: 'funcao',
    empresa: 'empresa',
    responsavel: 'responsavel',
    documento: 'documento'
  };

  export type PessoaScalarFieldEnum = (typeof PessoaScalarFieldEnum)[keyof typeof PessoaScalarFieldEnum]


  export const MedicaScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    documento: 'documento'
  };

  export type MedicaScalarFieldEnum = (typeof MedicaScalarFieldEnum)[keyof typeof MedicaScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type PessoaWhereInput = {
    AND?: PessoaWhereInput | PessoaWhereInput[]
    OR?: PessoaWhereInput[]
    NOT?: PessoaWhereInput | PessoaWhereInput[]
    id?: StringFilter<"Pessoa"> | string
    nome?: StringFilter<"Pessoa"> | string
    cpf?: StringFilter<"Pessoa"> | string
    dataNascimento?: StringFilter<"Pessoa"> | string
    dataExame?: StringFilter<"Pessoa"> | string
    tipoExame?: StringFilter<"Pessoa"> | string
    funcao?: StringFilter<"Pessoa"> | string
    empresa?: StringFilter<"Pessoa"> | string
    responsavel?: StringFilter<"Pessoa"> | string
    documento?: StringFilter<"Pessoa"> | string
    resultados?: XOR<ResultadoTypeNullableCompositeFilter, ResultadoTypeObjectEqualityInput> | null
  }

  export type PessoaOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    cpf?: SortOrder
    dataNascimento?: SortOrder
    dataExame?: SortOrder
    tipoExame?: SortOrder
    funcao?: SortOrder
    empresa?: SortOrder
    responsavel?: SortOrder
    documento?: SortOrder
    resultados?: ResultadoTypeOrderByInput
  }

  export type PessoaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PessoaWhereInput | PessoaWhereInput[]
    OR?: PessoaWhereInput[]
    NOT?: PessoaWhereInput | PessoaWhereInput[]
    nome?: StringFilter<"Pessoa"> | string
    cpf?: StringFilter<"Pessoa"> | string
    dataNascimento?: StringFilter<"Pessoa"> | string
    dataExame?: StringFilter<"Pessoa"> | string
    tipoExame?: StringFilter<"Pessoa"> | string
    funcao?: StringFilter<"Pessoa"> | string
    empresa?: StringFilter<"Pessoa"> | string
    responsavel?: StringFilter<"Pessoa"> | string
    documento?: StringFilter<"Pessoa"> | string
    resultados?: XOR<ResultadoTypeNullableCompositeFilter, ResultadoTypeObjectEqualityInput> | null
  }, "id">

  export type PessoaOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    cpf?: SortOrder
    dataNascimento?: SortOrder
    dataExame?: SortOrder
    tipoExame?: SortOrder
    funcao?: SortOrder
    empresa?: SortOrder
    responsavel?: SortOrder
    documento?: SortOrder
    _count?: PessoaCountOrderByAggregateInput
    _max?: PessoaMaxOrderByAggregateInput
    _min?: PessoaMinOrderByAggregateInput
  }

  export type PessoaScalarWhereWithAggregatesInput = {
    AND?: PessoaScalarWhereWithAggregatesInput | PessoaScalarWhereWithAggregatesInput[]
    OR?: PessoaScalarWhereWithAggregatesInput[]
    NOT?: PessoaScalarWhereWithAggregatesInput | PessoaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Pessoa"> | string
    nome?: StringWithAggregatesFilter<"Pessoa"> | string
    cpf?: StringWithAggregatesFilter<"Pessoa"> | string
    dataNascimento?: StringWithAggregatesFilter<"Pessoa"> | string
    dataExame?: StringWithAggregatesFilter<"Pessoa"> | string
    tipoExame?: StringWithAggregatesFilter<"Pessoa"> | string
    funcao?: StringWithAggregatesFilter<"Pessoa"> | string
    empresa?: StringWithAggregatesFilter<"Pessoa"> | string
    responsavel?: StringWithAggregatesFilter<"Pessoa"> | string
    documento?: StringWithAggregatesFilter<"Pessoa"> | string
  }

  export type MedicaWhereInput = {
    AND?: MedicaWhereInput | MedicaWhereInput[]
    OR?: MedicaWhereInput[]
    NOT?: MedicaWhereInput | MedicaWhereInput[]
    id?: StringFilter<"Medica"> | string
    nome?: StringFilter<"Medica"> | string
    documento?: StringFilter<"Medica"> | string
  }

  export type MedicaOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    documento?: SortOrder
  }

  export type MedicaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MedicaWhereInput | MedicaWhereInput[]
    OR?: MedicaWhereInput[]
    NOT?: MedicaWhereInput | MedicaWhereInput[]
    nome?: StringFilter<"Medica"> | string
    documento?: StringFilter<"Medica"> | string
  }, "id">

  export type MedicaOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    documento?: SortOrder
    _count?: MedicaCountOrderByAggregateInput
    _max?: MedicaMaxOrderByAggregateInput
    _min?: MedicaMinOrderByAggregateInput
  }

  export type MedicaScalarWhereWithAggregatesInput = {
    AND?: MedicaScalarWhereWithAggregatesInput | MedicaScalarWhereWithAggregatesInput[]
    OR?: MedicaScalarWhereWithAggregatesInput[]
    NOT?: MedicaScalarWhereWithAggregatesInput | MedicaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Medica"> | string
    nome?: StringWithAggregatesFilter<"Medica"> | string
    documento?: StringWithAggregatesFilter<"Medica"> | string
  }

  export type PessoaCreateInput = {
    id?: string
    nome: string
    cpf: string
    dataNascimento: string
    dataExame: string
    tipoExame: string
    funcao: string
    empresa: string
    responsavel: string
    documento: string
    resultados?: XOR<ResultadoTypeNullableCreateEnvelopeInput, ResultadoTypeCreateInput> | null
  }

  export type PessoaUncheckedCreateInput = {
    id?: string
    nome: string
    cpf: string
    dataNascimento: string
    dataExame: string
    tipoExame: string
    funcao: string
    empresa: string
    responsavel: string
    documento: string
    resultados?: XOR<ResultadoTypeNullableCreateEnvelopeInput, ResultadoTypeCreateInput> | null
  }

  export type PessoaUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    dataNascimento?: StringFieldUpdateOperationsInput | string
    dataExame?: StringFieldUpdateOperationsInput | string
    tipoExame?: StringFieldUpdateOperationsInput | string
    funcao?: StringFieldUpdateOperationsInput | string
    empresa?: StringFieldUpdateOperationsInput | string
    responsavel?: StringFieldUpdateOperationsInput | string
    documento?: StringFieldUpdateOperationsInput | string
    resultados?: XOR<ResultadoTypeNullableUpdateEnvelopeInput, ResultadoTypeCreateInput> | null
  }

  export type PessoaUncheckedUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    dataNascimento?: StringFieldUpdateOperationsInput | string
    dataExame?: StringFieldUpdateOperationsInput | string
    tipoExame?: StringFieldUpdateOperationsInput | string
    funcao?: StringFieldUpdateOperationsInput | string
    empresa?: StringFieldUpdateOperationsInput | string
    responsavel?: StringFieldUpdateOperationsInput | string
    documento?: StringFieldUpdateOperationsInput | string
    resultados?: XOR<ResultadoTypeNullableUpdateEnvelopeInput, ResultadoTypeCreateInput> | null
  }

  export type PessoaCreateManyInput = {
    id?: string
    nome: string
    cpf: string
    dataNascimento: string
    dataExame: string
    tipoExame: string
    funcao: string
    empresa: string
    responsavel: string
    documento: string
    resultados?: XOR<ResultadoTypeNullableCreateEnvelopeInput, ResultadoTypeCreateInput> | null
  }

  export type PessoaUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    dataNascimento?: StringFieldUpdateOperationsInput | string
    dataExame?: StringFieldUpdateOperationsInput | string
    tipoExame?: StringFieldUpdateOperationsInput | string
    funcao?: StringFieldUpdateOperationsInput | string
    empresa?: StringFieldUpdateOperationsInput | string
    responsavel?: StringFieldUpdateOperationsInput | string
    documento?: StringFieldUpdateOperationsInput | string
    resultados?: XOR<ResultadoTypeNullableUpdateEnvelopeInput, ResultadoTypeCreateInput> | null
  }

  export type PessoaUncheckedUpdateManyInput = {
    nome?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    dataNascimento?: StringFieldUpdateOperationsInput | string
    dataExame?: StringFieldUpdateOperationsInput | string
    tipoExame?: StringFieldUpdateOperationsInput | string
    funcao?: StringFieldUpdateOperationsInput | string
    empresa?: StringFieldUpdateOperationsInput | string
    responsavel?: StringFieldUpdateOperationsInput | string
    documento?: StringFieldUpdateOperationsInput | string
    resultados?: XOR<ResultadoTypeNullableUpdateEnvelopeInput, ResultadoTypeCreateInput> | null
  }

  export type MedicaCreateInput = {
    id?: string
    nome: string
    documento: string
  }

  export type MedicaUncheckedCreateInput = {
    id?: string
    nome: string
    documento: string
  }

  export type MedicaUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    documento?: StringFieldUpdateOperationsInput | string
  }

  export type MedicaUncheckedUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    documento?: StringFieldUpdateOperationsInput | string
  }

  export type MedicaCreateManyInput = {
    id?: string
    nome: string
    documento: string
  }

  export type MedicaUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    documento?: StringFieldUpdateOperationsInput | string
  }

  export type MedicaUncheckedUpdateManyInput = {
    nome?: StringFieldUpdateOperationsInput | string
    documento?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type ResultadoTypeNullableCompositeFilter = {
    equals?: ResultadoTypeObjectEqualityInput | null
    is?: ResultadoTypeWhereInput | null
    isNot?: ResultadoTypeWhereInput | null
    isSet?: boolean
  }

  export type ResultadoTypeObjectEqualityInput = {
    od: string
    d250: string
    d500: string
    d1000: string
    d2000: string
    d3000: string
    d4000: string
    d6000: string
    d8000: string
    oe: string
    e250: string
    e500: string
    e1000: string
    e2000: string
    e3000: string
    e4000: string
    e6000: string
    e8000: string
    obs: string
    ossea?: ViaOsseaObjectEqualityInput | null
  }

  export type ResultadoTypeOrderByInput = {
    od?: SortOrder
    d250?: SortOrder
    d500?: SortOrder
    d1000?: SortOrder
    d2000?: SortOrder
    d3000?: SortOrder
    d4000?: SortOrder
    d6000?: SortOrder
    d8000?: SortOrder
    oe?: SortOrder
    e250?: SortOrder
    e500?: SortOrder
    e1000?: SortOrder
    e2000?: SortOrder
    e3000?: SortOrder
    e4000?: SortOrder
    e6000?: SortOrder
    e8000?: SortOrder
    obs?: SortOrder
    ossea?: ViaOsseaOrderByInput
  }

  export type PessoaCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cpf?: SortOrder
    dataNascimento?: SortOrder
    dataExame?: SortOrder
    tipoExame?: SortOrder
    funcao?: SortOrder
    empresa?: SortOrder
    responsavel?: SortOrder
    documento?: SortOrder
  }

  export type PessoaMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cpf?: SortOrder
    dataNascimento?: SortOrder
    dataExame?: SortOrder
    tipoExame?: SortOrder
    funcao?: SortOrder
    empresa?: SortOrder
    responsavel?: SortOrder
    documento?: SortOrder
  }

  export type PessoaMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cpf?: SortOrder
    dataNascimento?: SortOrder
    dataExame?: SortOrder
    tipoExame?: SortOrder
    funcao?: SortOrder
    empresa?: SortOrder
    responsavel?: SortOrder
    documento?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type MedicaCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    documento?: SortOrder
  }

  export type MedicaMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    documento?: SortOrder
  }

  export type MedicaMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    documento?: SortOrder
  }

  export type ResultadoTypeNullableCreateEnvelopeInput = {
    set?: ResultadoTypeCreateInput | null
  }

  export type ResultadoTypeCreateInput = {
    od: string
    d250: string
    d500: string
    d1000: string
    d2000: string
    d3000: string
    d4000: string
    d6000: string
    d8000: string
    oe: string
    e250: string
    e500: string
    e1000: string
    e2000: string
    e3000: string
    e4000: string
    e6000: string
    e8000: string
    obs: string
    ossea?: ViaOsseaCreateInput | null
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type ResultadoTypeNullableUpdateEnvelopeInput = {
    set?: ResultadoTypeCreateInput | null
    upsert?: ResultadoTypeUpsertInput
    unset?: boolean
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type ResultadoTypeWhereInput = {
    AND?: ResultadoTypeWhereInput | ResultadoTypeWhereInput[]
    OR?: ResultadoTypeWhereInput[]
    NOT?: ResultadoTypeWhereInput | ResultadoTypeWhereInput[]
    od?: StringFilter<"ResultadoType"> | string
    d250?: StringFilter<"ResultadoType"> | string
    d500?: StringFilter<"ResultadoType"> | string
    d1000?: StringFilter<"ResultadoType"> | string
    d2000?: StringFilter<"ResultadoType"> | string
    d3000?: StringFilter<"ResultadoType"> | string
    d4000?: StringFilter<"ResultadoType"> | string
    d6000?: StringFilter<"ResultadoType"> | string
    d8000?: StringFilter<"ResultadoType"> | string
    oe?: StringFilter<"ResultadoType"> | string
    e250?: StringFilter<"ResultadoType"> | string
    e500?: StringFilter<"ResultadoType"> | string
    e1000?: StringFilter<"ResultadoType"> | string
    e2000?: StringFilter<"ResultadoType"> | string
    e3000?: StringFilter<"ResultadoType"> | string
    e4000?: StringFilter<"ResultadoType"> | string
    e6000?: StringFilter<"ResultadoType"> | string
    e8000?: StringFilter<"ResultadoType"> | string
    obs?: StringFilter<"ResultadoType"> | string
    ossea?: XOR<ViaOsseaNullableCompositeFilter, ViaOsseaObjectEqualityInput> | null
  }

  export type ViaOsseaObjectEqualityInput = {
    od: boolean
    d500?: string | null
    d1000?: string | null
    d2000?: string | null
    d3000?: string | null
    d4000?: string | null
    oe: boolean
    e500?: string | null
    e1000?: string | null
    e2000?: string | null
    e3000?: string | null
    e4000?: string | null
  }

  export type ViaOsseaOrderByInput = {
    od?: SortOrder
    d500?: SortOrder
    d1000?: SortOrder
    d2000?: SortOrder
    d3000?: SortOrder
    d4000?: SortOrder
    oe?: SortOrder
    e500?: SortOrder
    e1000?: SortOrder
    e2000?: SortOrder
    e3000?: SortOrder
    e4000?: SortOrder
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ViaOsseaCreateInput = {
    od: boolean
    d500?: string | null
    d1000?: string | null
    d2000?: string | null
    d3000?: string | null
    d4000?: string | null
    oe: boolean
    e500?: string | null
    e1000?: string | null
    e2000?: string | null
    e3000?: string | null
    e4000?: string | null
  }

  export type ResultadoTypeUpsertInput = {
    set: ResultadoTypeCreateInput | null
    update: ResultadoTypeUpdateInput
  }

  export type ViaOsseaNullableCompositeFilter = {
    equals?: ViaOsseaObjectEqualityInput | null
    is?: ViaOsseaWhereInput | null
    isNot?: ViaOsseaWhereInput | null
    isSet?: boolean
  }

  export type ResultadoTypeUpdateInput = {
    od?: StringFieldUpdateOperationsInput | string
    d250?: StringFieldUpdateOperationsInput | string
    d500?: StringFieldUpdateOperationsInput | string
    d1000?: StringFieldUpdateOperationsInput | string
    d2000?: StringFieldUpdateOperationsInput | string
    d3000?: StringFieldUpdateOperationsInput | string
    d4000?: StringFieldUpdateOperationsInput | string
    d6000?: StringFieldUpdateOperationsInput | string
    d8000?: StringFieldUpdateOperationsInput | string
    oe?: StringFieldUpdateOperationsInput | string
    e250?: StringFieldUpdateOperationsInput | string
    e500?: StringFieldUpdateOperationsInput | string
    e1000?: StringFieldUpdateOperationsInput | string
    e2000?: StringFieldUpdateOperationsInput | string
    e3000?: StringFieldUpdateOperationsInput | string
    e4000?: StringFieldUpdateOperationsInput | string
    e6000?: StringFieldUpdateOperationsInput | string
    e8000?: StringFieldUpdateOperationsInput | string
    obs?: StringFieldUpdateOperationsInput | string
    ossea?: XOR<ViaOsseaNullableUpdateEnvelopeInput, ViaOsseaCreateInput> | null
  }

  export type ViaOsseaWhereInput = {
    AND?: ViaOsseaWhereInput | ViaOsseaWhereInput[]
    OR?: ViaOsseaWhereInput[]
    NOT?: ViaOsseaWhereInput | ViaOsseaWhereInput[]
    od?: BoolFilter<"ViaOssea"> | boolean
    d500?: StringNullableFilter<"ViaOssea"> | string | null
    d1000?: StringNullableFilter<"ViaOssea"> | string | null
    d2000?: StringNullableFilter<"ViaOssea"> | string | null
    d3000?: StringNullableFilter<"ViaOssea"> | string | null
    d4000?: StringNullableFilter<"ViaOssea"> | string | null
    oe?: BoolFilter<"ViaOssea"> | boolean
    e500?: StringNullableFilter<"ViaOssea"> | string | null
    e1000?: StringNullableFilter<"ViaOssea"> | string | null
    e2000?: StringNullableFilter<"ViaOssea"> | string | null
    e3000?: StringNullableFilter<"ViaOssea"> | string | null
    e4000?: StringNullableFilter<"ViaOssea"> | string | null
  }

  export type ViaOsseaNullableUpdateEnvelopeInput = {
    set?: ViaOsseaCreateInput | null
    upsert?: ViaOsseaUpsertInput
    unset?: boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type ViaOsseaUpsertInput = {
    set: ViaOsseaCreateInput | null
    update: ViaOsseaUpdateInput
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type ViaOsseaUpdateInput = {
    od?: BoolFieldUpdateOperationsInput | boolean
    d500?: NullableStringFieldUpdateOperationsInput | string | null
    d1000?: NullableStringFieldUpdateOperationsInput | string | null
    d2000?: NullableStringFieldUpdateOperationsInput | string | null
    d3000?: NullableStringFieldUpdateOperationsInput | string | null
    d4000?: NullableStringFieldUpdateOperationsInput | string | null
    oe?: BoolFieldUpdateOperationsInput | boolean
    e500?: NullableStringFieldUpdateOperationsInput | string | null
    e1000?: NullableStringFieldUpdateOperationsInput | string | null
    e2000?: NullableStringFieldUpdateOperationsInput | string | null
    e3000?: NullableStringFieldUpdateOperationsInput | string | null
    e4000?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}