
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
 * Model Visitor
 * 
 */
export type Visitor = $Result.DefaultSelection<Prisma.$VisitorPayload>
/**
 * Model Bows
 * 
 */
export type Bows = $Result.DefaultSelection<Prisma.$BowsPayload>
/**
 * Model Bass
 * 
 */
export type Bass = $Result.DefaultSelection<Prisma.$BassPayload>
/**
 * Model Slider
 * 
 */
export type Slider = $Result.DefaultSelection<Prisma.$SliderPayload>
/**
 * Model Blog
 * 
 */
export type Blog = $Result.DefaultSelection<Prisma.$BlogPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Visitors
 * const visitors = await prisma.visitor.findMany()
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
   * // Fetch zero or more Visitors
   * const visitors = await prisma.visitor.findMany()
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
   * `prisma.visitor`: Exposes CRUD operations for the **Visitor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Visitors
    * const visitors = await prisma.visitor.findMany()
    * ```
    */
  get visitor(): Prisma.VisitorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bows`: Exposes CRUD operations for the **Bows** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bows
    * const bows = await prisma.bows.findMany()
    * ```
    */
  get bows(): Prisma.BowsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bass`: Exposes CRUD operations for the **Bass** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Basses
    * const basses = await prisma.bass.findMany()
    * ```
    */
  get bass(): Prisma.BassDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.slider`: Exposes CRUD operations for the **Slider** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sliders
    * const sliders = await prisma.slider.findMany()
    * ```
    */
  get slider(): Prisma.SliderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.blog`: Exposes CRUD operations for the **Blog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Blogs
    * const blogs = await prisma.blog.findMany()
    * ```
    */
  get blog(): Prisma.BlogDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
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
    Visitor: 'Visitor',
    Bows: 'Bows',
    Bass: 'Bass',
    Slider: 'Slider',
    Blog: 'Blog'
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
      modelProps: "visitor" | "bows" | "bass" | "slider" | "blog"
      txIsolationLevel: never
    }
    model: {
      Visitor: {
        payload: Prisma.$VisitorPayload<ExtArgs>
        fields: Prisma.VisitorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VisitorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VisitorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitorPayload>
          }
          findFirst: {
            args: Prisma.VisitorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VisitorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitorPayload>
          }
          findMany: {
            args: Prisma.VisitorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitorPayload>[]
          }
          create: {
            args: Prisma.VisitorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitorPayload>
          }
          createMany: {
            args: Prisma.VisitorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.VisitorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitorPayload>
          }
          update: {
            args: Prisma.VisitorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitorPayload>
          }
          deleteMany: {
            args: Prisma.VisitorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VisitorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VisitorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitorPayload>
          }
          aggregate: {
            args: Prisma.VisitorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVisitor>
          }
          groupBy: {
            args: Prisma.VisitorGroupByArgs<ExtArgs>
            result: $Utils.Optional<VisitorGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.VisitorFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.VisitorAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.VisitorCountArgs<ExtArgs>
            result: $Utils.Optional<VisitorCountAggregateOutputType> | number
          }
        }
      }
      Bows: {
        payload: Prisma.$BowsPayload<ExtArgs>
        fields: Prisma.BowsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BowsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BowsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BowsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BowsPayload>
          }
          findFirst: {
            args: Prisma.BowsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BowsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BowsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BowsPayload>
          }
          findMany: {
            args: Prisma.BowsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BowsPayload>[]
          }
          create: {
            args: Prisma.BowsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BowsPayload>
          }
          createMany: {
            args: Prisma.BowsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BowsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BowsPayload>
          }
          update: {
            args: Prisma.BowsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BowsPayload>
          }
          deleteMany: {
            args: Prisma.BowsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BowsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BowsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BowsPayload>
          }
          aggregate: {
            args: Prisma.BowsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBows>
          }
          groupBy: {
            args: Prisma.BowsGroupByArgs<ExtArgs>
            result: $Utils.Optional<BowsGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.BowsFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.BowsAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.BowsCountArgs<ExtArgs>
            result: $Utils.Optional<BowsCountAggregateOutputType> | number
          }
        }
      }
      Bass: {
        payload: Prisma.$BassPayload<ExtArgs>
        fields: Prisma.BassFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BassFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BassPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BassFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BassPayload>
          }
          findFirst: {
            args: Prisma.BassFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BassPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BassFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BassPayload>
          }
          findMany: {
            args: Prisma.BassFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BassPayload>[]
          }
          create: {
            args: Prisma.BassCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BassPayload>
          }
          createMany: {
            args: Prisma.BassCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BassDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BassPayload>
          }
          update: {
            args: Prisma.BassUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BassPayload>
          }
          deleteMany: {
            args: Prisma.BassDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BassUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BassUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BassPayload>
          }
          aggregate: {
            args: Prisma.BassAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBass>
          }
          groupBy: {
            args: Prisma.BassGroupByArgs<ExtArgs>
            result: $Utils.Optional<BassGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.BassFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.BassAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.BassCountArgs<ExtArgs>
            result: $Utils.Optional<BassCountAggregateOutputType> | number
          }
        }
      }
      Slider: {
        payload: Prisma.$SliderPayload<ExtArgs>
        fields: Prisma.SliderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SliderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SliderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SliderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SliderPayload>
          }
          findFirst: {
            args: Prisma.SliderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SliderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SliderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SliderPayload>
          }
          findMany: {
            args: Prisma.SliderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SliderPayload>[]
          }
          create: {
            args: Prisma.SliderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SliderPayload>
          }
          createMany: {
            args: Prisma.SliderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SliderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SliderPayload>
          }
          update: {
            args: Prisma.SliderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SliderPayload>
          }
          deleteMany: {
            args: Prisma.SliderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SliderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SliderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SliderPayload>
          }
          aggregate: {
            args: Prisma.SliderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSlider>
          }
          groupBy: {
            args: Prisma.SliderGroupByArgs<ExtArgs>
            result: $Utils.Optional<SliderGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.SliderFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.SliderAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.SliderCountArgs<ExtArgs>
            result: $Utils.Optional<SliderCountAggregateOutputType> | number
          }
        }
      }
      Blog: {
        payload: Prisma.$BlogPayload<ExtArgs>
        fields: Prisma.BlogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload>
          }
          findFirst: {
            args: Prisma.BlogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload>
          }
          findMany: {
            args: Prisma.BlogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload>[]
          }
          create: {
            args: Prisma.BlogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload>
          }
          createMany: {
            args: Prisma.BlogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BlogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload>
          }
          update: {
            args: Prisma.BlogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload>
          }
          deleteMany: {
            args: Prisma.BlogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BlogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload>
          }
          aggregate: {
            args: Prisma.BlogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlog>
          }
          groupBy: {
            args: Prisma.BlogGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlogGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.BlogFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.BlogAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.BlogCountArgs<ExtArgs>
            result: $Utils.Optional<BlogCountAggregateOutputType> | number
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
    visitor?: VisitorOmit
    bows?: BowsOmit
    bass?: BassOmit
    slider?: SliderOmit
    blog?: BlogOmit
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
   * Model Visitor
   */

  export type AggregateVisitor = {
    _count: VisitorCountAggregateOutputType | null
    _avg: VisitorAvgAggregateOutputType | null
    _sum: VisitorSumAggregateOutputType | null
    _min: VisitorMinAggregateOutputType | null
    _max: VisitorMaxAggregateOutputType | null
  }

  export type VisitorAvgAggregateOutputType = {
    count: number | null
  }

  export type VisitorSumAggregateOutputType = {
    count: number | null
  }

  export type VisitorMinAggregateOutputType = {
    id: string | null
    count: number | null
    updatedAt: Date | null
  }

  export type VisitorMaxAggregateOutputType = {
    id: string | null
    count: number | null
    updatedAt: Date | null
  }

  export type VisitorCountAggregateOutputType = {
    id: number
    count: number
    updatedAt: number
    _all: number
  }


  export type VisitorAvgAggregateInputType = {
    count?: true
  }

  export type VisitorSumAggregateInputType = {
    count?: true
  }

  export type VisitorMinAggregateInputType = {
    id?: true
    count?: true
    updatedAt?: true
  }

  export type VisitorMaxAggregateInputType = {
    id?: true
    count?: true
    updatedAt?: true
  }

  export type VisitorCountAggregateInputType = {
    id?: true
    count?: true
    updatedAt?: true
    _all?: true
  }

  export type VisitorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Visitor to aggregate.
     */
    where?: VisitorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Visitors to fetch.
     */
    orderBy?: VisitorOrderByWithRelationInput | VisitorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VisitorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Visitors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Visitors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Visitors
    **/
    _count?: true | VisitorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VisitorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VisitorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VisitorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VisitorMaxAggregateInputType
  }

  export type GetVisitorAggregateType<T extends VisitorAggregateArgs> = {
        [P in keyof T & keyof AggregateVisitor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVisitor[P]>
      : GetScalarType<T[P], AggregateVisitor[P]>
  }




  export type VisitorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VisitorWhereInput
    orderBy?: VisitorOrderByWithAggregationInput | VisitorOrderByWithAggregationInput[]
    by: VisitorScalarFieldEnum[] | VisitorScalarFieldEnum
    having?: VisitorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VisitorCountAggregateInputType | true
    _avg?: VisitorAvgAggregateInputType
    _sum?: VisitorSumAggregateInputType
    _min?: VisitorMinAggregateInputType
    _max?: VisitorMaxAggregateInputType
  }

  export type VisitorGroupByOutputType = {
    id: string
    count: number
    updatedAt: Date
    _count: VisitorCountAggregateOutputType | null
    _avg: VisitorAvgAggregateOutputType | null
    _sum: VisitorSumAggregateOutputType | null
    _min: VisitorMinAggregateOutputType | null
    _max: VisitorMaxAggregateOutputType | null
  }

  type GetVisitorGroupByPayload<T extends VisitorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VisitorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VisitorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VisitorGroupByOutputType[P]>
            : GetScalarType<T[P], VisitorGroupByOutputType[P]>
        }
      >
    >


  export type VisitorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    count?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["visitor"]>



  export type VisitorSelectScalar = {
    id?: boolean
    count?: boolean
    updatedAt?: boolean
  }

  export type VisitorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "count" | "updatedAt", ExtArgs["result"]["visitor"]>

  export type $VisitorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Visitor"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      count: number
      updatedAt: Date
    }, ExtArgs["result"]["visitor"]>
    composites: {}
  }

  type VisitorGetPayload<S extends boolean | null | undefined | VisitorDefaultArgs> = $Result.GetResult<Prisma.$VisitorPayload, S>

  type VisitorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VisitorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VisitorCountAggregateInputType | true
    }

  export interface VisitorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Visitor'], meta: { name: 'Visitor' } }
    /**
     * Find zero or one Visitor that matches the filter.
     * @param {VisitorFindUniqueArgs} args - Arguments to find a Visitor
     * @example
     * // Get one Visitor
     * const visitor = await prisma.visitor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VisitorFindUniqueArgs>(args: SelectSubset<T, VisitorFindUniqueArgs<ExtArgs>>): Prisma__VisitorClient<$Result.GetResult<Prisma.$VisitorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Visitor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VisitorFindUniqueOrThrowArgs} args - Arguments to find a Visitor
     * @example
     * // Get one Visitor
     * const visitor = await prisma.visitor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VisitorFindUniqueOrThrowArgs>(args: SelectSubset<T, VisitorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VisitorClient<$Result.GetResult<Prisma.$VisitorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Visitor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitorFindFirstArgs} args - Arguments to find a Visitor
     * @example
     * // Get one Visitor
     * const visitor = await prisma.visitor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VisitorFindFirstArgs>(args?: SelectSubset<T, VisitorFindFirstArgs<ExtArgs>>): Prisma__VisitorClient<$Result.GetResult<Prisma.$VisitorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Visitor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitorFindFirstOrThrowArgs} args - Arguments to find a Visitor
     * @example
     * // Get one Visitor
     * const visitor = await prisma.visitor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VisitorFindFirstOrThrowArgs>(args?: SelectSubset<T, VisitorFindFirstOrThrowArgs<ExtArgs>>): Prisma__VisitorClient<$Result.GetResult<Prisma.$VisitorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Visitors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Visitors
     * const visitors = await prisma.visitor.findMany()
     * 
     * // Get first 10 Visitors
     * const visitors = await prisma.visitor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const visitorWithIdOnly = await prisma.visitor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VisitorFindManyArgs>(args?: SelectSubset<T, VisitorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Visitor.
     * @param {VisitorCreateArgs} args - Arguments to create a Visitor.
     * @example
     * // Create one Visitor
     * const Visitor = await prisma.visitor.create({
     *   data: {
     *     // ... data to create a Visitor
     *   }
     * })
     * 
     */
    create<T extends VisitorCreateArgs>(args: SelectSubset<T, VisitorCreateArgs<ExtArgs>>): Prisma__VisitorClient<$Result.GetResult<Prisma.$VisitorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Visitors.
     * @param {VisitorCreateManyArgs} args - Arguments to create many Visitors.
     * @example
     * // Create many Visitors
     * const visitor = await prisma.visitor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VisitorCreateManyArgs>(args?: SelectSubset<T, VisitorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Visitor.
     * @param {VisitorDeleteArgs} args - Arguments to delete one Visitor.
     * @example
     * // Delete one Visitor
     * const Visitor = await prisma.visitor.delete({
     *   where: {
     *     // ... filter to delete one Visitor
     *   }
     * })
     * 
     */
    delete<T extends VisitorDeleteArgs>(args: SelectSubset<T, VisitorDeleteArgs<ExtArgs>>): Prisma__VisitorClient<$Result.GetResult<Prisma.$VisitorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Visitor.
     * @param {VisitorUpdateArgs} args - Arguments to update one Visitor.
     * @example
     * // Update one Visitor
     * const visitor = await prisma.visitor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VisitorUpdateArgs>(args: SelectSubset<T, VisitorUpdateArgs<ExtArgs>>): Prisma__VisitorClient<$Result.GetResult<Prisma.$VisitorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Visitors.
     * @param {VisitorDeleteManyArgs} args - Arguments to filter Visitors to delete.
     * @example
     * // Delete a few Visitors
     * const { count } = await prisma.visitor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VisitorDeleteManyArgs>(args?: SelectSubset<T, VisitorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Visitors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Visitors
     * const visitor = await prisma.visitor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VisitorUpdateManyArgs>(args: SelectSubset<T, VisitorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Visitor.
     * @param {VisitorUpsertArgs} args - Arguments to update or create a Visitor.
     * @example
     * // Update or create a Visitor
     * const visitor = await prisma.visitor.upsert({
     *   create: {
     *     // ... data to create a Visitor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Visitor we want to update
     *   }
     * })
     */
    upsert<T extends VisitorUpsertArgs>(args: SelectSubset<T, VisitorUpsertArgs<ExtArgs>>): Prisma__VisitorClient<$Result.GetResult<Prisma.$VisitorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Visitors that matches the filter.
     * @param {VisitorFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const visitor = await prisma.visitor.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: VisitorFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Visitor.
     * @param {VisitorAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const visitor = await prisma.visitor.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: VisitorAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Visitors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitorCountArgs} args - Arguments to filter Visitors to count.
     * @example
     * // Count the number of Visitors
     * const count = await prisma.visitor.count({
     *   where: {
     *     // ... the filter for the Visitors we want to count
     *   }
     * })
    **/
    count<T extends VisitorCountArgs>(
      args?: Subset<T, VisitorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VisitorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Visitor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VisitorAggregateArgs>(args: Subset<T, VisitorAggregateArgs>): Prisma.PrismaPromise<GetVisitorAggregateType<T>>

    /**
     * Group by Visitor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitorGroupByArgs} args - Group by arguments.
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
      T extends VisitorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VisitorGroupByArgs['orderBy'] }
        : { orderBy?: VisitorGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VisitorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVisitorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Visitor model
   */
  readonly fields: VisitorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Visitor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VisitorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Visitor model
   */
  interface VisitorFieldRefs {
    readonly id: FieldRef<"Visitor", 'String'>
    readonly count: FieldRef<"Visitor", 'Int'>
    readonly updatedAt: FieldRef<"Visitor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Visitor findUnique
   */
  export type VisitorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visitor
     */
    select?: VisitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Visitor
     */
    omit?: VisitorOmit<ExtArgs> | null
    /**
     * Filter, which Visitor to fetch.
     */
    where: VisitorWhereUniqueInput
  }

  /**
   * Visitor findUniqueOrThrow
   */
  export type VisitorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visitor
     */
    select?: VisitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Visitor
     */
    omit?: VisitorOmit<ExtArgs> | null
    /**
     * Filter, which Visitor to fetch.
     */
    where: VisitorWhereUniqueInput
  }

  /**
   * Visitor findFirst
   */
  export type VisitorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visitor
     */
    select?: VisitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Visitor
     */
    omit?: VisitorOmit<ExtArgs> | null
    /**
     * Filter, which Visitor to fetch.
     */
    where?: VisitorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Visitors to fetch.
     */
    orderBy?: VisitorOrderByWithRelationInput | VisitorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Visitors.
     */
    cursor?: VisitorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Visitors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Visitors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Visitors.
     */
    distinct?: VisitorScalarFieldEnum | VisitorScalarFieldEnum[]
  }

  /**
   * Visitor findFirstOrThrow
   */
  export type VisitorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visitor
     */
    select?: VisitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Visitor
     */
    omit?: VisitorOmit<ExtArgs> | null
    /**
     * Filter, which Visitor to fetch.
     */
    where?: VisitorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Visitors to fetch.
     */
    orderBy?: VisitorOrderByWithRelationInput | VisitorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Visitors.
     */
    cursor?: VisitorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Visitors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Visitors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Visitors.
     */
    distinct?: VisitorScalarFieldEnum | VisitorScalarFieldEnum[]
  }

  /**
   * Visitor findMany
   */
  export type VisitorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visitor
     */
    select?: VisitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Visitor
     */
    omit?: VisitorOmit<ExtArgs> | null
    /**
     * Filter, which Visitors to fetch.
     */
    where?: VisitorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Visitors to fetch.
     */
    orderBy?: VisitorOrderByWithRelationInput | VisitorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Visitors.
     */
    cursor?: VisitorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Visitors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Visitors.
     */
    skip?: number
    distinct?: VisitorScalarFieldEnum | VisitorScalarFieldEnum[]
  }

  /**
   * Visitor create
   */
  export type VisitorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visitor
     */
    select?: VisitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Visitor
     */
    omit?: VisitorOmit<ExtArgs> | null
    /**
     * The data needed to create a Visitor.
     */
    data: XOR<VisitorCreateInput, VisitorUncheckedCreateInput>
  }

  /**
   * Visitor createMany
   */
  export type VisitorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Visitors.
     */
    data: VisitorCreateManyInput | VisitorCreateManyInput[]
  }

  /**
   * Visitor update
   */
  export type VisitorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visitor
     */
    select?: VisitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Visitor
     */
    omit?: VisitorOmit<ExtArgs> | null
    /**
     * The data needed to update a Visitor.
     */
    data: XOR<VisitorUpdateInput, VisitorUncheckedUpdateInput>
    /**
     * Choose, which Visitor to update.
     */
    where: VisitorWhereUniqueInput
  }

  /**
   * Visitor updateMany
   */
  export type VisitorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Visitors.
     */
    data: XOR<VisitorUpdateManyMutationInput, VisitorUncheckedUpdateManyInput>
    /**
     * Filter which Visitors to update
     */
    where?: VisitorWhereInput
    /**
     * Limit how many Visitors to update.
     */
    limit?: number
  }

  /**
   * Visitor upsert
   */
  export type VisitorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visitor
     */
    select?: VisitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Visitor
     */
    omit?: VisitorOmit<ExtArgs> | null
    /**
     * The filter to search for the Visitor to update in case it exists.
     */
    where: VisitorWhereUniqueInput
    /**
     * In case the Visitor found by the `where` argument doesn't exist, create a new Visitor with this data.
     */
    create: XOR<VisitorCreateInput, VisitorUncheckedCreateInput>
    /**
     * In case the Visitor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VisitorUpdateInput, VisitorUncheckedUpdateInput>
  }

  /**
   * Visitor delete
   */
  export type VisitorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visitor
     */
    select?: VisitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Visitor
     */
    omit?: VisitorOmit<ExtArgs> | null
    /**
     * Filter which Visitor to delete.
     */
    where: VisitorWhereUniqueInput
  }

  /**
   * Visitor deleteMany
   */
  export type VisitorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Visitors to delete
     */
    where?: VisitorWhereInput
    /**
     * Limit how many Visitors to delete.
     */
    limit?: number
  }

  /**
   * Visitor findRaw
   */
  export type VisitorFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Visitor aggregateRaw
   */
  export type VisitorAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Visitor without action
   */
  export type VisitorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Visitor
     */
    select?: VisitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Visitor
     */
    omit?: VisitorOmit<ExtArgs> | null
  }


  /**
   * Model Bows
   */

  export type AggregateBows = {
    _count: BowsCountAggregateOutputType | null
    _min: BowsMinAggregateOutputType | null
    _max: BowsMaxAggregateOutputType | null
  }

  export type BowsMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    available: string | null
    price: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BowsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    available: string | null
    price: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BowsCountAggregateOutputType = {
    id: number
    images: number
    name: number
    description: number
    available: number
    price: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BowsMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    available?: true
    price?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BowsMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    available?: true
    price?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BowsCountAggregateInputType = {
    id?: true
    images?: true
    name?: true
    description?: true
    available?: true
    price?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BowsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bows to aggregate.
     */
    where?: BowsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bows to fetch.
     */
    orderBy?: BowsOrderByWithRelationInput | BowsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BowsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bows
    **/
    _count?: true | BowsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BowsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BowsMaxAggregateInputType
  }

  export type GetBowsAggregateType<T extends BowsAggregateArgs> = {
        [P in keyof T & keyof AggregateBows]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBows[P]>
      : GetScalarType<T[P], AggregateBows[P]>
  }




  export type BowsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BowsWhereInput
    orderBy?: BowsOrderByWithAggregationInput | BowsOrderByWithAggregationInput[]
    by: BowsScalarFieldEnum[] | BowsScalarFieldEnum
    having?: BowsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BowsCountAggregateInputType | true
    _min?: BowsMinAggregateInputType
    _max?: BowsMaxAggregateInputType
  }

  export type BowsGroupByOutputType = {
    id: string
    images: string[]
    name: string
    description: string
    available: string
    price: string
    createdAt: Date
    updatedAt: Date
    _count: BowsCountAggregateOutputType | null
    _min: BowsMinAggregateOutputType | null
    _max: BowsMaxAggregateOutputType | null
  }

  type GetBowsGroupByPayload<T extends BowsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BowsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BowsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BowsGroupByOutputType[P]>
            : GetScalarType<T[P], BowsGroupByOutputType[P]>
        }
      >
    >


  export type BowsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    images?: boolean
    name?: boolean
    description?: boolean
    available?: boolean
    price?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["bows"]>



  export type BowsSelectScalar = {
    id?: boolean
    images?: boolean
    name?: boolean
    description?: boolean
    available?: boolean
    price?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BowsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "images" | "name" | "description" | "available" | "price" | "createdAt" | "updatedAt", ExtArgs["result"]["bows"]>

  export type $BowsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Bows"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      images: string[]
      name: string
      description: string
      available: string
      price: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["bows"]>
    composites: {}
  }

  type BowsGetPayload<S extends boolean | null | undefined | BowsDefaultArgs> = $Result.GetResult<Prisma.$BowsPayload, S>

  type BowsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BowsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BowsCountAggregateInputType | true
    }

  export interface BowsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Bows'], meta: { name: 'Bows' } }
    /**
     * Find zero or one Bows that matches the filter.
     * @param {BowsFindUniqueArgs} args - Arguments to find a Bows
     * @example
     * // Get one Bows
     * const bows = await prisma.bows.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BowsFindUniqueArgs>(args: SelectSubset<T, BowsFindUniqueArgs<ExtArgs>>): Prisma__BowsClient<$Result.GetResult<Prisma.$BowsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bows that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BowsFindUniqueOrThrowArgs} args - Arguments to find a Bows
     * @example
     * // Get one Bows
     * const bows = await prisma.bows.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BowsFindUniqueOrThrowArgs>(args: SelectSubset<T, BowsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BowsClient<$Result.GetResult<Prisma.$BowsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BowsFindFirstArgs} args - Arguments to find a Bows
     * @example
     * // Get one Bows
     * const bows = await prisma.bows.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BowsFindFirstArgs>(args?: SelectSubset<T, BowsFindFirstArgs<ExtArgs>>): Prisma__BowsClient<$Result.GetResult<Prisma.$BowsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bows that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BowsFindFirstOrThrowArgs} args - Arguments to find a Bows
     * @example
     * // Get one Bows
     * const bows = await prisma.bows.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BowsFindFirstOrThrowArgs>(args?: SelectSubset<T, BowsFindFirstOrThrowArgs<ExtArgs>>): Prisma__BowsClient<$Result.GetResult<Prisma.$BowsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BowsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bows
     * const bows = await prisma.bows.findMany()
     * 
     * // Get first 10 Bows
     * const bows = await prisma.bows.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bowsWithIdOnly = await prisma.bows.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BowsFindManyArgs>(args?: SelectSubset<T, BowsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BowsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bows.
     * @param {BowsCreateArgs} args - Arguments to create a Bows.
     * @example
     * // Create one Bows
     * const Bows = await prisma.bows.create({
     *   data: {
     *     // ... data to create a Bows
     *   }
     * })
     * 
     */
    create<T extends BowsCreateArgs>(args: SelectSubset<T, BowsCreateArgs<ExtArgs>>): Prisma__BowsClient<$Result.GetResult<Prisma.$BowsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bows.
     * @param {BowsCreateManyArgs} args - Arguments to create many Bows.
     * @example
     * // Create many Bows
     * const bows = await prisma.bows.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BowsCreateManyArgs>(args?: SelectSubset<T, BowsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Bows.
     * @param {BowsDeleteArgs} args - Arguments to delete one Bows.
     * @example
     * // Delete one Bows
     * const Bows = await prisma.bows.delete({
     *   where: {
     *     // ... filter to delete one Bows
     *   }
     * })
     * 
     */
    delete<T extends BowsDeleteArgs>(args: SelectSubset<T, BowsDeleteArgs<ExtArgs>>): Prisma__BowsClient<$Result.GetResult<Prisma.$BowsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bows.
     * @param {BowsUpdateArgs} args - Arguments to update one Bows.
     * @example
     * // Update one Bows
     * const bows = await prisma.bows.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BowsUpdateArgs>(args: SelectSubset<T, BowsUpdateArgs<ExtArgs>>): Prisma__BowsClient<$Result.GetResult<Prisma.$BowsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bows.
     * @param {BowsDeleteManyArgs} args - Arguments to filter Bows to delete.
     * @example
     * // Delete a few Bows
     * const { count } = await prisma.bows.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BowsDeleteManyArgs>(args?: SelectSubset<T, BowsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BowsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bows
     * const bows = await prisma.bows.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BowsUpdateManyArgs>(args: SelectSubset<T, BowsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Bows.
     * @param {BowsUpsertArgs} args - Arguments to update or create a Bows.
     * @example
     * // Update or create a Bows
     * const bows = await prisma.bows.upsert({
     *   create: {
     *     // ... data to create a Bows
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bows we want to update
     *   }
     * })
     */
    upsert<T extends BowsUpsertArgs>(args: SelectSubset<T, BowsUpsertArgs<ExtArgs>>): Prisma__BowsClient<$Result.GetResult<Prisma.$BowsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bows that matches the filter.
     * @param {BowsFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const bows = await prisma.bows.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: BowsFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Bows.
     * @param {BowsAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const bows = await prisma.bows.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: BowsAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Bows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BowsCountArgs} args - Arguments to filter Bows to count.
     * @example
     * // Count the number of Bows
     * const count = await prisma.bows.count({
     *   where: {
     *     // ... the filter for the Bows we want to count
     *   }
     * })
    **/
    count<T extends BowsCountArgs>(
      args?: Subset<T, BowsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BowsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BowsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BowsAggregateArgs>(args: Subset<T, BowsAggregateArgs>): Prisma.PrismaPromise<GetBowsAggregateType<T>>

    /**
     * Group by Bows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BowsGroupByArgs} args - Group by arguments.
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
      T extends BowsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BowsGroupByArgs['orderBy'] }
        : { orderBy?: BowsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BowsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBowsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Bows model
   */
  readonly fields: BowsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bows.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BowsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Bows model
   */
  interface BowsFieldRefs {
    readonly id: FieldRef<"Bows", 'String'>
    readonly images: FieldRef<"Bows", 'String[]'>
    readonly name: FieldRef<"Bows", 'String'>
    readonly description: FieldRef<"Bows", 'String'>
    readonly available: FieldRef<"Bows", 'String'>
    readonly price: FieldRef<"Bows", 'String'>
    readonly createdAt: FieldRef<"Bows", 'DateTime'>
    readonly updatedAt: FieldRef<"Bows", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Bows findUnique
   */
  export type BowsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bows
     */
    select?: BowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bows
     */
    omit?: BowsOmit<ExtArgs> | null
    /**
     * Filter, which Bows to fetch.
     */
    where: BowsWhereUniqueInput
  }

  /**
   * Bows findUniqueOrThrow
   */
  export type BowsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bows
     */
    select?: BowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bows
     */
    omit?: BowsOmit<ExtArgs> | null
    /**
     * Filter, which Bows to fetch.
     */
    where: BowsWhereUniqueInput
  }

  /**
   * Bows findFirst
   */
  export type BowsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bows
     */
    select?: BowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bows
     */
    omit?: BowsOmit<ExtArgs> | null
    /**
     * Filter, which Bows to fetch.
     */
    where?: BowsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bows to fetch.
     */
    orderBy?: BowsOrderByWithRelationInput | BowsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bows.
     */
    cursor?: BowsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bows.
     */
    distinct?: BowsScalarFieldEnum | BowsScalarFieldEnum[]
  }

  /**
   * Bows findFirstOrThrow
   */
  export type BowsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bows
     */
    select?: BowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bows
     */
    omit?: BowsOmit<ExtArgs> | null
    /**
     * Filter, which Bows to fetch.
     */
    where?: BowsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bows to fetch.
     */
    orderBy?: BowsOrderByWithRelationInput | BowsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bows.
     */
    cursor?: BowsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bows.
     */
    distinct?: BowsScalarFieldEnum | BowsScalarFieldEnum[]
  }

  /**
   * Bows findMany
   */
  export type BowsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bows
     */
    select?: BowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bows
     */
    omit?: BowsOmit<ExtArgs> | null
    /**
     * Filter, which Bows to fetch.
     */
    where?: BowsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bows to fetch.
     */
    orderBy?: BowsOrderByWithRelationInput | BowsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bows.
     */
    cursor?: BowsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bows.
     */
    skip?: number
    distinct?: BowsScalarFieldEnum | BowsScalarFieldEnum[]
  }

  /**
   * Bows create
   */
  export type BowsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bows
     */
    select?: BowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bows
     */
    omit?: BowsOmit<ExtArgs> | null
    /**
     * The data needed to create a Bows.
     */
    data: XOR<BowsCreateInput, BowsUncheckedCreateInput>
  }

  /**
   * Bows createMany
   */
  export type BowsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bows.
     */
    data: BowsCreateManyInput | BowsCreateManyInput[]
  }

  /**
   * Bows update
   */
  export type BowsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bows
     */
    select?: BowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bows
     */
    omit?: BowsOmit<ExtArgs> | null
    /**
     * The data needed to update a Bows.
     */
    data: XOR<BowsUpdateInput, BowsUncheckedUpdateInput>
    /**
     * Choose, which Bows to update.
     */
    where: BowsWhereUniqueInput
  }

  /**
   * Bows updateMany
   */
  export type BowsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bows.
     */
    data: XOR<BowsUpdateManyMutationInput, BowsUncheckedUpdateManyInput>
    /**
     * Filter which Bows to update
     */
    where?: BowsWhereInput
    /**
     * Limit how many Bows to update.
     */
    limit?: number
  }

  /**
   * Bows upsert
   */
  export type BowsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bows
     */
    select?: BowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bows
     */
    omit?: BowsOmit<ExtArgs> | null
    /**
     * The filter to search for the Bows to update in case it exists.
     */
    where: BowsWhereUniqueInput
    /**
     * In case the Bows found by the `where` argument doesn't exist, create a new Bows with this data.
     */
    create: XOR<BowsCreateInput, BowsUncheckedCreateInput>
    /**
     * In case the Bows was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BowsUpdateInput, BowsUncheckedUpdateInput>
  }

  /**
   * Bows delete
   */
  export type BowsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bows
     */
    select?: BowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bows
     */
    omit?: BowsOmit<ExtArgs> | null
    /**
     * Filter which Bows to delete.
     */
    where: BowsWhereUniqueInput
  }

  /**
   * Bows deleteMany
   */
  export type BowsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bows to delete
     */
    where?: BowsWhereInput
    /**
     * Limit how many Bows to delete.
     */
    limit?: number
  }

  /**
   * Bows findRaw
   */
  export type BowsFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Bows aggregateRaw
   */
  export type BowsAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Bows without action
   */
  export type BowsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bows
     */
    select?: BowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bows
     */
    omit?: BowsOmit<ExtArgs> | null
  }


  /**
   * Model Bass
   */

  export type AggregateBass = {
    _count: BassCountAggregateOutputType | null
    _min: BassMinAggregateOutputType | null
    _max: BassMaxAggregateOutputType | null
  }

  export type BassMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    available: string | null
    price: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BassMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    available: string | null
    price: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BassCountAggregateOutputType = {
    id: number
    images: number
    name: number
    description: number
    available: number
    price: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BassMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    available?: true
    price?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BassMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    available?: true
    price?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BassCountAggregateInputType = {
    id?: true
    images?: true
    name?: true
    description?: true
    available?: true
    price?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BassAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bass to aggregate.
     */
    where?: BassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Basses to fetch.
     */
    orderBy?: BassOrderByWithRelationInput | BassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Basses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Basses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Basses
    **/
    _count?: true | BassCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BassMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BassMaxAggregateInputType
  }

  export type GetBassAggregateType<T extends BassAggregateArgs> = {
        [P in keyof T & keyof AggregateBass]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBass[P]>
      : GetScalarType<T[P], AggregateBass[P]>
  }




  export type BassGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BassWhereInput
    orderBy?: BassOrderByWithAggregationInput | BassOrderByWithAggregationInput[]
    by: BassScalarFieldEnum[] | BassScalarFieldEnum
    having?: BassScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BassCountAggregateInputType | true
    _min?: BassMinAggregateInputType
    _max?: BassMaxAggregateInputType
  }

  export type BassGroupByOutputType = {
    id: string
    images: string[]
    name: string
    description: string
    available: string
    price: string
    createdAt: Date
    updatedAt: Date
    _count: BassCountAggregateOutputType | null
    _min: BassMinAggregateOutputType | null
    _max: BassMaxAggregateOutputType | null
  }

  type GetBassGroupByPayload<T extends BassGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BassGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BassGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BassGroupByOutputType[P]>
            : GetScalarType<T[P], BassGroupByOutputType[P]>
        }
      >
    >


  export type BassSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    images?: boolean
    name?: boolean
    description?: boolean
    available?: boolean
    price?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["bass"]>



  export type BassSelectScalar = {
    id?: boolean
    images?: boolean
    name?: boolean
    description?: boolean
    available?: boolean
    price?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BassOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "images" | "name" | "description" | "available" | "price" | "createdAt" | "updatedAt", ExtArgs["result"]["bass"]>

  export type $BassPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Bass"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      images: string[]
      name: string
      description: string
      available: string
      price: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["bass"]>
    composites: {}
  }

  type BassGetPayload<S extends boolean | null | undefined | BassDefaultArgs> = $Result.GetResult<Prisma.$BassPayload, S>

  type BassCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BassFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BassCountAggregateInputType | true
    }

  export interface BassDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Bass'], meta: { name: 'Bass' } }
    /**
     * Find zero or one Bass that matches the filter.
     * @param {BassFindUniqueArgs} args - Arguments to find a Bass
     * @example
     * // Get one Bass
     * const bass = await prisma.bass.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BassFindUniqueArgs>(args: SelectSubset<T, BassFindUniqueArgs<ExtArgs>>): Prisma__BassClient<$Result.GetResult<Prisma.$BassPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bass that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BassFindUniqueOrThrowArgs} args - Arguments to find a Bass
     * @example
     * // Get one Bass
     * const bass = await prisma.bass.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BassFindUniqueOrThrowArgs>(args: SelectSubset<T, BassFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BassClient<$Result.GetResult<Prisma.$BassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bass that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BassFindFirstArgs} args - Arguments to find a Bass
     * @example
     * // Get one Bass
     * const bass = await prisma.bass.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BassFindFirstArgs>(args?: SelectSubset<T, BassFindFirstArgs<ExtArgs>>): Prisma__BassClient<$Result.GetResult<Prisma.$BassPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bass that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BassFindFirstOrThrowArgs} args - Arguments to find a Bass
     * @example
     * // Get one Bass
     * const bass = await prisma.bass.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BassFindFirstOrThrowArgs>(args?: SelectSubset<T, BassFindFirstOrThrowArgs<ExtArgs>>): Prisma__BassClient<$Result.GetResult<Prisma.$BassPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Basses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BassFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Basses
     * const basses = await prisma.bass.findMany()
     * 
     * // Get first 10 Basses
     * const basses = await prisma.bass.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bassWithIdOnly = await prisma.bass.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BassFindManyArgs>(args?: SelectSubset<T, BassFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bass.
     * @param {BassCreateArgs} args - Arguments to create a Bass.
     * @example
     * // Create one Bass
     * const Bass = await prisma.bass.create({
     *   data: {
     *     // ... data to create a Bass
     *   }
     * })
     * 
     */
    create<T extends BassCreateArgs>(args: SelectSubset<T, BassCreateArgs<ExtArgs>>): Prisma__BassClient<$Result.GetResult<Prisma.$BassPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Basses.
     * @param {BassCreateManyArgs} args - Arguments to create many Basses.
     * @example
     * // Create many Basses
     * const bass = await prisma.bass.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BassCreateManyArgs>(args?: SelectSubset<T, BassCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Bass.
     * @param {BassDeleteArgs} args - Arguments to delete one Bass.
     * @example
     * // Delete one Bass
     * const Bass = await prisma.bass.delete({
     *   where: {
     *     // ... filter to delete one Bass
     *   }
     * })
     * 
     */
    delete<T extends BassDeleteArgs>(args: SelectSubset<T, BassDeleteArgs<ExtArgs>>): Prisma__BassClient<$Result.GetResult<Prisma.$BassPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bass.
     * @param {BassUpdateArgs} args - Arguments to update one Bass.
     * @example
     * // Update one Bass
     * const bass = await prisma.bass.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BassUpdateArgs>(args: SelectSubset<T, BassUpdateArgs<ExtArgs>>): Prisma__BassClient<$Result.GetResult<Prisma.$BassPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Basses.
     * @param {BassDeleteManyArgs} args - Arguments to filter Basses to delete.
     * @example
     * // Delete a few Basses
     * const { count } = await prisma.bass.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BassDeleteManyArgs>(args?: SelectSubset<T, BassDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Basses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BassUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Basses
     * const bass = await prisma.bass.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BassUpdateManyArgs>(args: SelectSubset<T, BassUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Bass.
     * @param {BassUpsertArgs} args - Arguments to update or create a Bass.
     * @example
     * // Update or create a Bass
     * const bass = await prisma.bass.upsert({
     *   create: {
     *     // ... data to create a Bass
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bass we want to update
     *   }
     * })
     */
    upsert<T extends BassUpsertArgs>(args: SelectSubset<T, BassUpsertArgs<ExtArgs>>): Prisma__BassClient<$Result.GetResult<Prisma.$BassPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Basses that matches the filter.
     * @param {BassFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const bass = await prisma.bass.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: BassFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Bass.
     * @param {BassAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const bass = await prisma.bass.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: BassAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Basses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BassCountArgs} args - Arguments to filter Basses to count.
     * @example
     * // Count the number of Basses
     * const count = await prisma.bass.count({
     *   where: {
     *     // ... the filter for the Basses we want to count
     *   }
     * })
    **/
    count<T extends BassCountArgs>(
      args?: Subset<T, BassCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BassCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bass.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BassAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BassAggregateArgs>(args: Subset<T, BassAggregateArgs>): Prisma.PrismaPromise<GetBassAggregateType<T>>

    /**
     * Group by Bass.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BassGroupByArgs} args - Group by arguments.
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
      T extends BassGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BassGroupByArgs['orderBy'] }
        : { orderBy?: BassGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BassGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBassGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Bass model
   */
  readonly fields: BassFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bass.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BassClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Bass model
   */
  interface BassFieldRefs {
    readonly id: FieldRef<"Bass", 'String'>
    readonly images: FieldRef<"Bass", 'String[]'>
    readonly name: FieldRef<"Bass", 'String'>
    readonly description: FieldRef<"Bass", 'String'>
    readonly available: FieldRef<"Bass", 'String'>
    readonly price: FieldRef<"Bass", 'String'>
    readonly createdAt: FieldRef<"Bass", 'DateTime'>
    readonly updatedAt: FieldRef<"Bass", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Bass findUnique
   */
  export type BassFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bass
     */
    select?: BassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bass
     */
    omit?: BassOmit<ExtArgs> | null
    /**
     * Filter, which Bass to fetch.
     */
    where: BassWhereUniqueInput
  }

  /**
   * Bass findUniqueOrThrow
   */
  export type BassFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bass
     */
    select?: BassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bass
     */
    omit?: BassOmit<ExtArgs> | null
    /**
     * Filter, which Bass to fetch.
     */
    where: BassWhereUniqueInput
  }

  /**
   * Bass findFirst
   */
  export type BassFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bass
     */
    select?: BassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bass
     */
    omit?: BassOmit<ExtArgs> | null
    /**
     * Filter, which Bass to fetch.
     */
    where?: BassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Basses to fetch.
     */
    orderBy?: BassOrderByWithRelationInput | BassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Basses.
     */
    cursor?: BassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Basses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Basses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Basses.
     */
    distinct?: BassScalarFieldEnum | BassScalarFieldEnum[]
  }

  /**
   * Bass findFirstOrThrow
   */
  export type BassFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bass
     */
    select?: BassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bass
     */
    omit?: BassOmit<ExtArgs> | null
    /**
     * Filter, which Bass to fetch.
     */
    where?: BassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Basses to fetch.
     */
    orderBy?: BassOrderByWithRelationInput | BassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Basses.
     */
    cursor?: BassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Basses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Basses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Basses.
     */
    distinct?: BassScalarFieldEnum | BassScalarFieldEnum[]
  }

  /**
   * Bass findMany
   */
  export type BassFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bass
     */
    select?: BassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bass
     */
    omit?: BassOmit<ExtArgs> | null
    /**
     * Filter, which Basses to fetch.
     */
    where?: BassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Basses to fetch.
     */
    orderBy?: BassOrderByWithRelationInput | BassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Basses.
     */
    cursor?: BassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Basses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Basses.
     */
    skip?: number
    distinct?: BassScalarFieldEnum | BassScalarFieldEnum[]
  }

  /**
   * Bass create
   */
  export type BassCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bass
     */
    select?: BassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bass
     */
    omit?: BassOmit<ExtArgs> | null
    /**
     * The data needed to create a Bass.
     */
    data: XOR<BassCreateInput, BassUncheckedCreateInput>
  }

  /**
   * Bass createMany
   */
  export type BassCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Basses.
     */
    data: BassCreateManyInput | BassCreateManyInput[]
  }

  /**
   * Bass update
   */
  export type BassUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bass
     */
    select?: BassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bass
     */
    omit?: BassOmit<ExtArgs> | null
    /**
     * The data needed to update a Bass.
     */
    data: XOR<BassUpdateInput, BassUncheckedUpdateInput>
    /**
     * Choose, which Bass to update.
     */
    where: BassWhereUniqueInput
  }

  /**
   * Bass updateMany
   */
  export type BassUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Basses.
     */
    data: XOR<BassUpdateManyMutationInput, BassUncheckedUpdateManyInput>
    /**
     * Filter which Basses to update
     */
    where?: BassWhereInput
    /**
     * Limit how many Basses to update.
     */
    limit?: number
  }

  /**
   * Bass upsert
   */
  export type BassUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bass
     */
    select?: BassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bass
     */
    omit?: BassOmit<ExtArgs> | null
    /**
     * The filter to search for the Bass to update in case it exists.
     */
    where: BassWhereUniqueInput
    /**
     * In case the Bass found by the `where` argument doesn't exist, create a new Bass with this data.
     */
    create: XOR<BassCreateInput, BassUncheckedCreateInput>
    /**
     * In case the Bass was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BassUpdateInput, BassUncheckedUpdateInput>
  }

  /**
   * Bass delete
   */
  export type BassDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bass
     */
    select?: BassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bass
     */
    omit?: BassOmit<ExtArgs> | null
    /**
     * Filter which Bass to delete.
     */
    where: BassWhereUniqueInput
  }

  /**
   * Bass deleteMany
   */
  export type BassDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Basses to delete
     */
    where?: BassWhereInput
    /**
     * Limit how many Basses to delete.
     */
    limit?: number
  }

  /**
   * Bass findRaw
   */
  export type BassFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Bass aggregateRaw
   */
  export type BassAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Bass without action
   */
  export type BassDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bass
     */
    select?: BassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bass
     */
    omit?: BassOmit<ExtArgs> | null
  }


  /**
   * Model Slider
   */

  export type AggregateSlider = {
    _count: SliderCountAggregateOutputType | null
    _min: SliderMinAggregateOutputType | null
    _max: SliderMaxAggregateOutputType | null
  }

  export type SliderMinAggregateOutputType = {
    id: string | null
    imageUrl: string | null
    title: string | null
    subtitle: string | null
    description: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SliderMaxAggregateOutputType = {
    id: string | null
    imageUrl: string | null
    title: string | null
    subtitle: string | null
    description: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SliderCountAggregateOutputType = {
    id: number
    imageUrl: number
    title: number
    subtitle: number
    description: number
    active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SliderMinAggregateInputType = {
    id?: true
    imageUrl?: true
    title?: true
    subtitle?: true
    description?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SliderMaxAggregateInputType = {
    id?: true
    imageUrl?: true
    title?: true
    subtitle?: true
    description?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SliderCountAggregateInputType = {
    id?: true
    imageUrl?: true
    title?: true
    subtitle?: true
    description?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SliderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Slider to aggregate.
     */
    where?: SliderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sliders to fetch.
     */
    orderBy?: SliderOrderByWithRelationInput | SliderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SliderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sliders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sliders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sliders
    **/
    _count?: true | SliderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SliderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SliderMaxAggregateInputType
  }

  export type GetSliderAggregateType<T extends SliderAggregateArgs> = {
        [P in keyof T & keyof AggregateSlider]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSlider[P]>
      : GetScalarType<T[P], AggregateSlider[P]>
  }




  export type SliderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SliderWhereInput
    orderBy?: SliderOrderByWithAggregationInput | SliderOrderByWithAggregationInput[]
    by: SliderScalarFieldEnum[] | SliderScalarFieldEnum
    having?: SliderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SliderCountAggregateInputType | true
    _min?: SliderMinAggregateInputType
    _max?: SliderMaxAggregateInputType
  }

  export type SliderGroupByOutputType = {
    id: string
    imageUrl: string
    title: string
    subtitle: string
    description: string
    active: boolean
    createdAt: Date
    updatedAt: Date
    _count: SliderCountAggregateOutputType | null
    _min: SliderMinAggregateOutputType | null
    _max: SliderMaxAggregateOutputType | null
  }

  type GetSliderGroupByPayload<T extends SliderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SliderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SliderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SliderGroupByOutputType[P]>
            : GetScalarType<T[P], SliderGroupByOutputType[P]>
        }
      >
    >


  export type SliderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imageUrl?: boolean
    title?: boolean
    subtitle?: boolean
    description?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["slider"]>



  export type SliderSelectScalar = {
    id?: boolean
    imageUrl?: boolean
    title?: boolean
    subtitle?: boolean
    description?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SliderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "imageUrl" | "title" | "subtitle" | "description" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["slider"]>

  export type $SliderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Slider"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      imageUrl: string
      title: string
      subtitle: string
      description: string
      active: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["slider"]>
    composites: {}
  }

  type SliderGetPayload<S extends boolean | null | undefined | SliderDefaultArgs> = $Result.GetResult<Prisma.$SliderPayload, S>

  type SliderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SliderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SliderCountAggregateInputType | true
    }

  export interface SliderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Slider'], meta: { name: 'Slider' } }
    /**
     * Find zero or one Slider that matches the filter.
     * @param {SliderFindUniqueArgs} args - Arguments to find a Slider
     * @example
     * // Get one Slider
     * const slider = await prisma.slider.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SliderFindUniqueArgs>(args: SelectSubset<T, SliderFindUniqueArgs<ExtArgs>>): Prisma__SliderClient<$Result.GetResult<Prisma.$SliderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Slider that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SliderFindUniqueOrThrowArgs} args - Arguments to find a Slider
     * @example
     * // Get one Slider
     * const slider = await prisma.slider.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SliderFindUniqueOrThrowArgs>(args: SelectSubset<T, SliderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SliderClient<$Result.GetResult<Prisma.$SliderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Slider that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SliderFindFirstArgs} args - Arguments to find a Slider
     * @example
     * // Get one Slider
     * const slider = await prisma.slider.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SliderFindFirstArgs>(args?: SelectSubset<T, SliderFindFirstArgs<ExtArgs>>): Prisma__SliderClient<$Result.GetResult<Prisma.$SliderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Slider that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SliderFindFirstOrThrowArgs} args - Arguments to find a Slider
     * @example
     * // Get one Slider
     * const slider = await prisma.slider.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SliderFindFirstOrThrowArgs>(args?: SelectSubset<T, SliderFindFirstOrThrowArgs<ExtArgs>>): Prisma__SliderClient<$Result.GetResult<Prisma.$SliderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sliders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SliderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sliders
     * const sliders = await prisma.slider.findMany()
     * 
     * // Get first 10 Sliders
     * const sliders = await prisma.slider.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sliderWithIdOnly = await prisma.slider.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SliderFindManyArgs>(args?: SelectSubset<T, SliderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SliderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Slider.
     * @param {SliderCreateArgs} args - Arguments to create a Slider.
     * @example
     * // Create one Slider
     * const Slider = await prisma.slider.create({
     *   data: {
     *     // ... data to create a Slider
     *   }
     * })
     * 
     */
    create<T extends SliderCreateArgs>(args: SelectSubset<T, SliderCreateArgs<ExtArgs>>): Prisma__SliderClient<$Result.GetResult<Prisma.$SliderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sliders.
     * @param {SliderCreateManyArgs} args - Arguments to create many Sliders.
     * @example
     * // Create many Sliders
     * const slider = await prisma.slider.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SliderCreateManyArgs>(args?: SelectSubset<T, SliderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Slider.
     * @param {SliderDeleteArgs} args - Arguments to delete one Slider.
     * @example
     * // Delete one Slider
     * const Slider = await prisma.slider.delete({
     *   where: {
     *     // ... filter to delete one Slider
     *   }
     * })
     * 
     */
    delete<T extends SliderDeleteArgs>(args: SelectSubset<T, SliderDeleteArgs<ExtArgs>>): Prisma__SliderClient<$Result.GetResult<Prisma.$SliderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Slider.
     * @param {SliderUpdateArgs} args - Arguments to update one Slider.
     * @example
     * // Update one Slider
     * const slider = await prisma.slider.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SliderUpdateArgs>(args: SelectSubset<T, SliderUpdateArgs<ExtArgs>>): Prisma__SliderClient<$Result.GetResult<Prisma.$SliderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sliders.
     * @param {SliderDeleteManyArgs} args - Arguments to filter Sliders to delete.
     * @example
     * // Delete a few Sliders
     * const { count } = await prisma.slider.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SliderDeleteManyArgs>(args?: SelectSubset<T, SliderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sliders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SliderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sliders
     * const slider = await prisma.slider.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SliderUpdateManyArgs>(args: SelectSubset<T, SliderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Slider.
     * @param {SliderUpsertArgs} args - Arguments to update or create a Slider.
     * @example
     * // Update or create a Slider
     * const slider = await prisma.slider.upsert({
     *   create: {
     *     // ... data to create a Slider
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Slider we want to update
     *   }
     * })
     */
    upsert<T extends SliderUpsertArgs>(args: SelectSubset<T, SliderUpsertArgs<ExtArgs>>): Prisma__SliderClient<$Result.GetResult<Prisma.$SliderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sliders that matches the filter.
     * @param {SliderFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const slider = await prisma.slider.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: SliderFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Slider.
     * @param {SliderAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const slider = await prisma.slider.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: SliderAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Sliders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SliderCountArgs} args - Arguments to filter Sliders to count.
     * @example
     * // Count the number of Sliders
     * const count = await prisma.slider.count({
     *   where: {
     *     // ... the filter for the Sliders we want to count
     *   }
     * })
    **/
    count<T extends SliderCountArgs>(
      args?: Subset<T, SliderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SliderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Slider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SliderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SliderAggregateArgs>(args: Subset<T, SliderAggregateArgs>): Prisma.PrismaPromise<GetSliderAggregateType<T>>

    /**
     * Group by Slider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SliderGroupByArgs} args - Group by arguments.
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
      T extends SliderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SliderGroupByArgs['orderBy'] }
        : { orderBy?: SliderGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SliderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSliderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Slider model
   */
  readonly fields: SliderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Slider.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SliderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Slider model
   */
  interface SliderFieldRefs {
    readonly id: FieldRef<"Slider", 'String'>
    readonly imageUrl: FieldRef<"Slider", 'String'>
    readonly title: FieldRef<"Slider", 'String'>
    readonly subtitle: FieldRef<"Slider", 'String'>
    readonly description: FieldRef<"Slider", 'String'>
    readonly active: FieldRef<"Slider", 'Boolean'>
    readonly createdAt: FieldRef<"Slider", 'DateTime'>
    readonly updatedAt: FieldRef<"Slider", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Slider findUnique
   */
  export type SliderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slider
     */
    select?: SliderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slider
     */
    omit?: SliderOmit<ExtArgs> | null
    /**
     * Filter, which Slider to fetch.
     */
    where: SliderWhereUniqueInput
  }

  /**
   * Slider findUniqueOrThrow
   */
  export type SliderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slider
     */
    select?: SliderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slider
     */
    omit?: SliderOmit<ExtArgs> | null
    /**
     * Filter, which Slider to fetch.
     */
    where: SliderWhereUniqueInput
  }

  /**
   * Slider findFirst
   */
  export type SliderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slider
     */
    select?: SliderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slider
     */
    omit?: SliderOmit<ExtArgs> | null
    /**
     * Filter, which Slider to fetch.
     */
    where?: SliderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sliders to fetch.
     */
    orderBy?: SliderOrderByWithRelationInput | SliderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sliders.
     */
    cursor?: SliderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sliders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sliders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sliders.
     */
    distinct?: SliderScalarFieldEnum | SliderScalarFieldEnum[]
  }

  /**
   * Slider findFirstOrThrow
   */
  export type SliderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slider
     */
    select?: SliderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slider
     */
    omit?: SliderOmit<ExtArgs> | null
    /**
     * Filter, which Slider to fetch.
     */
    where?: SliderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sliders to fetch.
     */
    orderBy?: SliderOrderByWithRelationInput | SliderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sliders.
     */
    cursor?: SliderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sliders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sliders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sliders.
     */
    distinct?: SliderScalarFieldEnum | SliderScalarFieldEnum[]
  }

  /**
   * Slider findMany
   */
  export type SliderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slider
     */
    select?: SliderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slider
     */
    omit?: SliderOmit<ExtArgs> | null
    /**
     * Filter, which Sliders to fetch.
     */
    where?: SliderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sliders to fetch.
     */
    orderBy?: SliderOrderByWithRelationInput | SliderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sliders.
     */
    cursor?: SliderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sliders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sliders.
     */
    skip?: number
    distinct?: SliderScalarFieldEnum | SliderScalarFieldEnum[]
  }

  /**
   * Slider create
   */
  export type SliderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slider
     */
    select?: SliderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slider
     */
    omit?: SliderOmit<ExtArgs> | null
    /**
     * The data needed to create a Slider.
     */
    data: XOR<SliderCreateInput, SliderUncheckedCreateInput>
  }

  /**
   * Slider createMany
   */
  export type SliderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sliders.
     */
    data: SliderCreateManyInput | SliderCreateManyInput[]
  }

  /**
   * Slider update
   */
  export type SliderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slider
     */
    select?: SliderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slider
     */
    omit?: SliderOmit<ExtArgs> | null
    /**
     * The data needed to update a Slider.
     */
    data: XOR<SliderUpdateInput, SliderUncheckedUpdateInput>
    /**
     * Choose, which Slider to update.
     */
    where: SliderWhereUniqueInput
  }

  /**
   * Slider updateMany
   */
  export type SliderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sliders.
     */
    data: XOR<SliderUpdateManyMutationInput, SliderUncheckedUpdateManyInput>
    /**
     * Filter which Sliders to update
     */
    where?: SliderWhereInput
    /**
     * Limit how many Sliders to update.
     */
    limit?: number
  }

  /**
   * Slider upsert
   */
  export type SliderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slider
     */
    select?: SliderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slider
     */
    omit?: SliderOmit<ExtArgs> | null
    /**
     * The filter to search for the Slider to update in case it exists.
     */
    where: SliderWhereUniqueInput
    /**
     * In case the Slider found by the `where` argument doesn't exist, create a new Slider with this data.
     */
    create: XOR<SliderCreateInput, SliderUncheckedCreateInput>
    /**
     * In case the Slider was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SliderUpdateInput, SliderUncheckedUpdateInput>
  }

  /**
   * Slider delete
   */
  export type SliderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slider
     */
    select?: SliderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slider
     */
    omit?: SliderOmit<ExtArgs> | null
    /**
     * Filter which Slider to delete.
     */
    where: SliderWhereUniqueInput
  }

  /**
   * Slider deleteMany
   */
  export type SliderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sliders to delete
     */
    where?: SliderWhereInput
    /**
     * Limit how many Sliders to delete.
     */
    limit?: number
  }

  /**
   * Slider findRaw
   */
  export type SliderFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Slider aggregateRaw
   */
  export type SliderAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Slider without action
   */
  export type SliderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slider
     */
    select?: SliderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Slider
     */
    omit?: SliderOmit<ExtArgs> | null
  }


  /**
   * Model Blog
   */

  export type AggregateBlog = {
    _count: BlogCountAggregateOutputType | null
    _min: BlogMinAggregateOutputType | null
    _max: BlogMaxAggregateOutputType | null
  }

  export type BlogMinAggregateOutputType = {
    id: string | null
    imageUrl: string | null
    title: string | null
    subtitle: string | null
    description: string | null
    blogtext: string | null
    template: string | null
    english: boolean | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BlogMaxAggregateOutputType = {
    id: string | null
    imageUrl: string | null
    title: string | null
    subtitle: string | null
    description: string | null
    blogtext: string | null
    template: string | null
    english: boolean | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BlogCountAggregateOutputType = {
    id: number
    imageUrl: number
    title: number
    subtitle: number
    description: number
    blogtext: number
    template: number
    english: number
    active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BlogMinAggregateInputType = {
    id?: true
    imageUrl?: true
    title?: true
    subtitle?: true
    description?: true
    blogtext?: true
    template?: true
    english?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BlogMaxAggregateInputType = {
    id?: true
    imageUrl?: true
    title?: true
    subtitle?: true
    description?: true
    blogtext?: true
    template?: true
    english?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BlogCountAggregateInputType = {
    id?: true
    imageUrl?: true
    title?: true
    subtitle?: true
    description?: true
    blogtext?: true
    template?: true
    english?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BlogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Blog to aggregate.
     */
    where?: BlogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blogs to fetch.
     */
    orderBy?: BlogOrderByWithRelationInput | BlogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Blogs
    **/
    _count?: true | BlogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlogMaxAggregateInputType
  }

  export type GetBlogAggregateType<T extends BlogAggregateArgs> = {
        [P in keyof T & keyof AggregateBlog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlog[P]>
      : GetScalarType<T[P], AggregateBlog[P]>
  }




  export type BlogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogWhereInput
    orderBy?: BlogOrderByWithAggregationInput | BlogOrderByWithAggregationInput[]
    by: BlogScalarFieldEnum[] | BlogScalarFieldEnum
    having?: BlogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlogCountAggregateInputType | true
    _min?: BlogMinAggregateInputType
    _max?: BlogMaxAggregateInputType
  }

  export type BlogGroupByOutputType = {
    id: string
    imageUrl: string
    title: string
    subtitle: string
    description: string
    blogtext: string
    template: string
    english: boolean
    active: boolean
    createdAt: Date
    updatedAt: Date
    _count: BlogCountAggregateOutputType | null
    _min: BlogMinAggregateOutputType | null
    _max: BlogMaxAggregateOutputType | null
  }

  type GetBlogGroupByPayload<T extends BlogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlogGroupByOutputType[P]>
            : GetScalarType<T[P], BlogGroupByOutputType[P]>
        }
      >
    >


  export type BlogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imageUrl?: boolean
    title?: boolean
    subtitle?: boolean
    description?: boolean
    blogtext?: boolean
    template?: boolean
    english?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["blog"]>



  export type BlogSelectScalar = {
    id?: boolean
    imageUrl?: boolean
    title?: boolean
    subtitle?: boolean
    description?: boolean
    blogtext?: boolean
    template?: boolean
    english?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BlogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "imageUrl" | "title" | "subtitle" | "description" | "blogtext" | "template" | "english" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["blog"]>

  export type $BlogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Blog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      imageUrl: string
      title: string
      subtitle: string
      description: string
      blogtext: string
      template: string
      english: boolean
      active: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["blog"]>
    composites: {}
  }

  type BlogGetPayload<S extends boolean | null | undefined | BlogDefaultArgs> = $Result.GetResult<Prisma.$BlogPayload, S>

  type BlogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BlogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BlogCountAggregateInputType | true
    }

  export interface BlogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Blog'], meta: { name: 'Blog' } }
    /**
     * Find zero or one Blog that matches the filter.
     * @param {BlogFindUniqueArgs} args - Arguments to find a Blog
     * @example
     * // Get one Blog
     * const blog = await prisma.blog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlogFindUniqueArgs>(args: SelectSubset<T, BlogFindUniqueArgs<ExtArgs>>): Prisma__BlogClient<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Blog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BlogFindUniqueOrThrowArgs} args - Arguments to find a Blog
     * @example
     * // Get one Blog
     * const blog = await prisma.blog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlogFindUniqueOrThrowArgs>(args: SelectSubset<T, BlogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlogClient<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Blog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogFindFirstArgs} args - Arguments to find a Blog
     * @example
     * // Get one Blog
     * const blog = await prisma.blog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlogFindFirstArgs>(args?: SelectSubset<T, BlogFindFirstArgs<ExtArgs>>): Prisma__BlogClient<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Blog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogFindFirstOrThrowArgs} args - Arguments to find a Blog
     * @example
     * // Get one Blog
     * const blog = await prisma.blog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlogFindFirstOrThrowArgs>(args?: SelectSubset<T, BlogFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlogClient<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Blogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Blogs
     * const blogs = await prisma.blog.findMany()
     * 
     * // Get first 10 Blogs
     * const blogs = await prisma.blog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const blogWithIdOnly = await prisma.blog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BlogFindManyArgs>(args?: SelectSubset<T, BlogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Blog.
     * @param {BlogCreateArgs} args - Arguments to create a Blog.
     * @example
     * // Create one Blog
     * const Blog = await prisma.blog.create({
     *   data: {
     *     // ... data to create a Blog
     *   }
     * })
     * 
     */
    create<T extends BlogCreateArgs>(args: SelectSubset<T, BlogCreateArgs<ExtArgs>>): Prisma__BlogClient<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Blogs.
     * @param {BlogCreateManyArgs} args - Arguments to create many Blogs.
     * @example
     * // Create many Blogs
     * const blog = await prisma.blog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlogCreateManyArgs>(args?: SelectSubset<T, BlogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Blog.
     * @param {BlogDeleteArgs} args - Arguments to delete one Blog.
     * @example
     * // Delete one Blog
     * const Blog = await prisma.blog.delete({
     *   where: {
     *     // ... filter to delete one Blog
     *   }
     * })
     * 
     */
    delete<T extends BlogDeleteArgs>(args: SelectSubset<T, BlogDeleteArgs<ExtArgs>>): Prisma__BlogClient<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Blog.
     * @param {BlogUpdateArgs} args - Arguments to update one Blog.
     * @example
     * // Update one Blog
     * const blog = await prisma.blog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlogUpdateArgs>(args: SelectSubset<T, BlogUpdateArgs<ExtArgs>>): Prisma__BlogClient<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Blogs.
     * @param {BlogDeleteManyArgs} args - Arguments to filter Blogs to delete.
     * @example
     * // Delete a few Blogs
     * const { count } = await prisma.blog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlogDeleteManyArgs>(args?: SelectSubset<T, BlogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Blogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Blogs
     * const blog = await prisma.blog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlogUpdateManyArgs>(args: SelectSubset<T, BlogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Blog.
     * @param {BlogUpsertArgs} args - Arguments to update or create a Blog.
     * @example
     * // Update or create a Blog
     * const blog = await prisma.blog.upsert({
     *   create: {
     *     // ... data to create a Blog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Blog we want to update
     *   }
     * })
     */
    upsert<T extends BlogUpsertArgs>(args: SelectSubset<T, BlogUpsertArgs<ExtArgs>>): Prisma__BlogClient<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Blogs that matches the filter.
     * @param {BlogFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const blog = await prisma.blog.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: BlogFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Blog.
     * @param {BlogAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const blog = await prisma.blog.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: BlogAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Blogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogCountArgs} args - Arguments to filter Blogs to count.
     * @example
     * // Count the number of Blogs
     * const count = await prisma.blog.count({
     *   where: {
     *     // ... the filter for the Blogs we want to count
     *   }
     * })
    **/
    count<T extends BlogCountArgs>(
      args?: Subset<T, BlogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Blog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BlogAggregateArgs>(args: Subset<T, BlogAggregateArgs>): Prisma.PrismaPromise<GetBlogAggregateType<T>>

    /**
     * Group by Blog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogGroupByArgs} args - Group by arguments.
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
      T extends BlogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlogGroupByArgs['orderBy'] }
        : { orderBy?: BlogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BlogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Blog model
   */
  readonly fields: BlogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Blog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Blog model
   */
  interface BlogFieldRefs {
    readonly id: FieldRef<"Blog", 'String'>
    readonly imageUrl: FieldRef<"Blog", 'String'>
    readonly title: FieldRef<"Blog", 'String'>
    readonly subtitle: FieldRef<"Blog", 'String'>
    readonly description: FieldRef<"Blog", 'String'>
    readonly blogtext: FieldRef<"Blog", 'String'>
    readonly template: FieldRef<"Blog", 'String'>
    readonly english: FieldRef<"Blog", 'Boolean'>
    readonly active: FieldRef<"Blog", 'Boolean'>
    readonly createdAt: FieldRef<"Blog", 'DateTime'>
    readonly updatedAt: FieldRef<"Blog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Blog findUnique
   */
  export type BlogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blog
     */
    omit?: BlogOmit<ExtArgs> | null
    /**
     * Filter, which Blog to fetch.
     */
    where: BlogWhereUniqueInput
  }

  /**
   * Blog findUniqueOrThrow
   */
  export type BlogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blog
     */
    omit?: BlogOmit<ExtArgs> | null
    /**
     * Filter, which Blog to fetch.
     */
    where: BlogWhereUniqueInput
  }

  /**
   * Blog findFirst
   */
  export type BlogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blog
     */
    omit?: BlogOmit<ExtArgs> | null
    /**
     * Filter, which Blog to fetch.
     */
    where?: BlogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blogs to fetch.
     */
    orderBy?: BlogOrderByWithRelationInput | BlogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Blogs.
     */
    cursor?: BlogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Blogs.
     */
    distinct?: BlogScalarFieldEnum | BlogScalarFieldEnum[]
  }

  /**
   * Blog findFirstOrThrow
   */
  export type BlogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blog
     */
    omit?: BlogOmit<ExtArgs> | null
    /**
     * Filter, which Blog to fetch.
     */
    where?: BlogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blogs to fetch.
     */
    orderBy?: BlogOrderByWithRelationInput | BlogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Blogs.
     */
    cursor?: BlogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Blogs.
     */
    distinct?: BlogScalarFieldEnum | BlogScalarFieldEnum[]
  }

  /**
   * Blog findMany
   */
  export type BlogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blog
     */
    omit?: BlogOmit<ExtArgs> | null
    /**
     * Filter, which Blogs to fetch.
     */
    where?: BlogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blogs to fetch.
     */
    orderBy?: BlogOrderByWithRelationInput | BlogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Blogs.
     */
    cursor?: BlogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blogs.
     */
    skip?: number
    distinct?: BlogScalarFieldEnum | BlogScalarFieldEnum[]
  }

  /**
   * Blog create
   */
  export type BlogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blog
     */
    omit?: BlogOmit<ExtArgs> | null
    /**
     * The data needed to create a Blog.
     */
    data: XOR<BlogCreateInput, BlogUncheckedCreateInput>
  }

  /**
   * Blog createMany
   */
  export type BlogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Blogs.
     */
    data: BlogCreateManyInput | BlogCreateManyInput[]
  }

  /**
   * Blog update
   */
  export type BlogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blog
     */
    omit?: BlogOmit<ExtArgs> | null
    /**
     * The data needed to update a Blog.
     */
    data: XOR<BlogUpdateInput, BlogUncheckedUpdateInput>
    /**
     * Choose, which Blog to update.
     */
    where: BlogWhereUniqueInput
  }

  /**
   * Blog updateMany
   */
  export type BlogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Blogs.
     */
    data: XOR<BlogUpdateManyMutationInput, BlogUncheckedUpdateManyInput>
    /**
     * Filter which Blogs to update
     */
    where?: BlogWhereInput
    /**
     * Limit how many Blogs to update.
     */
    limit?: number
  }

  /**
   * Blog upsert
   */
  export type BlogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blog
     */
    omit?: BlogOmit<ExtArgs> | null
    /**
     * The filter to search for the Blog to update in case it exists.
     */
    where: BlogWhereUniqueInput
    /**
     * In case the Blog found by the `where` argument doesn't exist, create a new Blog with this data.
     */
    create: XOR<BlogCreateInput, BlogUncheckedCreateInput>
    /**
     * In case the Blog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlogUpdateInput, BlogUncheckedUpdateInput>
  }

  /**
   * Blog delete
   */
  export type BlogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blog
     */
    omit?: BlogOmit<ExtArgs> | null
    /**
     * Filter which Blog to delete.
     */
    where: BlogWhereUniqueInput
  }

  /**
   * Blog deleteMany
   */
  export type BlogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Blogs to delete
     */
    where?: BlogWhereInput
    /**
     * Limit how many Blogs to delete.
     */
    limit?: number
  }

  /**
   * Blog findRaw
   */
  export type BlogFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Blog aggregateRaw
   */
  export type BlogAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Blog without action
   */
  export type BlogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blog
     */
    omit?: BlogOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const VisitorScalarFieldEnum: {
    id: 'id',
    count: 'count',
    updatedAt: 'updatedAt'
  };

  export type VisitorScalarFieldEnum = (typeof VisitorScalarFieldEnum)[keyof typeof VisitorScalarFieldEnum]


  export const BowsScalarFieldEnum: {
    id: 'id',
    images: 'images',
    name: 'name',
    description: 'description',
    available: 'available',
    price: 'price',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BowsScalarFieldEnum = (typeof BowsScalarFieldEnum)[keyof typeof BowsScalarFieldEnum]


  export const BassScalarFieldEnum: {
    id: 'id',
    images: 'images',
    name: 'name',
    description: 'description',
    available: 'available',
    price: 'price',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BassScalarFieldEnum = (typeof BassScalarFieldEnum)[keyof typeof BassScalarFieldEnum]


  export const SliderScalarFieldEnum: {
    id: 'id',
    imageUrl: 'imageUrl',
    title: 'title',
    subtitle: 'subtitle',
    description: 'description',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SliderScalarFieldEnum = (typeof SliderScalarFieldEnum)[keyof typeof SliderScalarFieldEnum]


  export const BlogScalarFieldEnum: {
    id: 'id',
    imageUrl: 'imageUrl',
    title: 'title',
    subtitle: 'subtitle',
    description: 'description',
    blogtext: 'blogtext',
    template: 'template',
    english: 'english',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BlogScalarFieldEnum = (typeof BlogScalarFieldEnum)[keyof typeof BlogScalarFieldEnum]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type VisitorWhereInput = {
    AND?: VisitorWhereInput | VisitorWhereInput[]
    OR?: VisitorWhereInput[]
    NOT?: VisitorWhereInput | VisitorWhereInput[]
    id?: StringFilter<"Visitor"> | string
    count?: IntFilter<"Visitor"> | number
    updatedAt?: DateTimeFilter<"Visitor"> | Date | string
  }

  export type VisitorOrderByWithRelationInput = {
    id?: SortOrder
    count?: SortOrder
    updatedAt?: SortOrder
  }

  export type VisitorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VisitorWhereInput | VisitorWhereInput[]
    OR?: VisitorWhereInput[]
    NOT?: VisitorWhereInput | VisitorWhereInput[]
    count?: IntFilter<"Visitor"> | number
    updatedAt?: DateTimeFilter<"Visitor"> | Date | string
  }, "id">

  export type VisitorOrderByWithAggregationInput = {
    id?: SortOrder
    count?: SortOrder
    updatedAt?: SortOrder
    _count?: VisitorCountOrderByAggregateInput
    _avg?: VisitorAvgOrderByAggregateInput
    _max?: VisitorMaxOrderByAggregateInput
    _min?: VisitorMinOrderByAggregateInput
    _sum?: VisitorSumOrderByAggregateInput
  }

  export type VisitorScalarWhereWithAggregatesInput = {
    AND?: VisitorScalarWhereWithAggregatesInput | VisitorScalarWhereWithAggregatesInput[]
    OR?: VisitorScalarWhereWithAggregatesInput[]
    NOT?: VisitorScalarWhereWithAggregatesInput | VisitorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Visitor"> | string
    count?: IntWithAggregatesFilter<"Visitor"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"Visitor"> | Date | string
  }

  export type BowsWhereInput = {
    AND?: BowsWhereInput | BowsWhereInput[]
    OR?: BowsWhereInput[]
    NOT?: BowsWhereInput | BowsWhereInput[]
    id?: StringFilter<"Bows"> | string
    images?: StringNullableListFilter<"Bows">
    name?: StringFilter<"Bows"> | string
    description?: StringFilter<"Bows"> | string
    available?: StringFilter<"Bows"> | string
    price?: StringFilter<"Bows"> | string
    createdAt?: DateTimeFilter<"Bows"> | Date | string
    updatedAt?: DateTimeFilter<"Bows"> | Date | string
  }

  export type BowsOrderByWithRelationInput = {
    id?: SortOrder
    images?: SortOrder
    name?: SortOrder
    description?: SortOrder
    available?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BowsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BowsWhereInput | BowsWhereInput[]
    OR?: BowsWhereInput[]
    NOT?: BowsWhereInput | BowsWhereInput[]
    images?: StringNullableListFilter<"Bows">
    name?: StringFilter<"Bows"> | string
    description?: StringFilter<"Bows"> | string
    available?: StringFilter<"Bows"> | string
    price?: StringFilter<"Bows"> | string
    createdAt?: DateTimeFilter<"Bows"> | Date | string
    updatedAt?: DateTimeFilter<"Bows"> | Date | string
  }, "id">

  export type BowsOrderByWithAggregationInput = {
    id?: SortOrder
    images?: SortOrder
    name?: SortOrder
    description?: SortOrder
    available?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BowsCountOrderByAggregateInput
    _max?: BowsMaxOrderByAggregateInput
    _min?: BowsMinOrderByAggregateInput
  }

  export type BowsScalarWhereWithAggregatesInput = {
    AND?: BowsScalarWhereWithAggregatesInput | BowsScalarWhereWithAggregatesInput[]
    OR?: BowsScalarWhereWithAggregatesInput[]
    NOT?: BowsScalarWhereWithAggregatesInput | BowsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Bows"> | string
    images?: StringNullableListFilter<"Bows">
    name?: StringWithAggregatesFilter<"Bows"> | string
    description?: StringWithAggregatesFilter<"Bows"> | string
    available?: StringWithAggregatesFilter<"Bows"> | string
    price?: StringWithAggregatesFilter<"Bows"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Bows"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Bows"> | Date | string
  }

  export type BassWhereInput = {
    AND?: BassWhereInput | BassWhereInput[]
    OR?: BassWhereInput[]
    NOT?: BassWhereInput | BassWhereInput[]
    id?: StringFilter<"Bass"> | string
    images?: StringNullableListFilter<"Bass">
    name?: StringFilter<"Bass"> | string
    description?: StringFilter<"Bass"> | string
    available?: StringFilter<"Bass"> | string
    price?: StringFilter<"Bass"> | string
    createdAt?: DateTimeFilter<"Bass"> | Date | string
    updatedAt?: DateTimeFilter<"Bass"> | Date | string
  }

  export type BassOrderByWithRelationInput = {
    id?: SortOrder
    images?: SortOrder
    name?: SortOrder
    description?: SortOrder
    available?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BassWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BassWhereInput | BassWhereInput[]
    OR?: BassWhereInput[]
    NOT?: BassWhereInput | BassWhereInput[]
    images?: StringNullableListFilter<"Bass">
    name?: StringFilter<"Bass"> | string
    description?: StringFilter<"Bass"> | string
    available?: StringFilter<"Bass"> | string
    price?: StringFilter<"Bass"> | string
    createdAt?: DateTimeFilter<"Bass"> | Date | string
    updatedAt?: DateTimeFilter<"Bass"> | Date | string
  }, "id">

  export type BassOrderByWithAggregationInput = {
    id?: SortOrder
    images?: SortOrder
    name?: SortOrder
    description?: SortOrder
    available?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BassCountOrderByAggregateInput
    _max?: BassMaxOrderByAggregateInput
    _min?: BassMinOrderByAggregateInput
  }

  export type BassScalarWhereWithAggregatesInput = {
    AND?: BassScalarWhereWithAggregatesInput | BassScalarWhereWithAggregatesInput[]
    OR?: BassScalarWhereWithAggregatesInput[]
    NOT?: BassScalarWhereWithAggregatesInput | BassScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Bass"> | string
    images?: StringNullableListFilter<"Bass">
    name?: StringWithAggregatesFilter<"Bass"> | string
    description?: StringWithAggregatesFilter<"Bass"> | string
    available?: StringWithAggregatesFilter<"Bass"> | string
    price?: StringWithAggregatesFilter<"Bass"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Bass"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Bass"> | Date | string
  }

  export type SliderWhereInput = {
    AND?: SliderWhereInput | SliderWhereInput[]
    OR?: SliderWhereInput[]
    NOT?: SliderWhereInput | SliderWhereInput[]
    id?: StringFilter<"Slider"> | string
    imageUrl?: StringFilter<"Slider"> | string
    title?: StringFilter<"Slider"> | string
    subtitle?: StringFilter<"Slider"> | string
    description?: StringFilter<"Slider"> | string
    active?: BoolFilter<"Slider"> | boolean
    createdAt?: DateTimeFilter<"Slider"> | Date | string
    updatedAt?: DateTimeFilter<"Slider"> | Date | string
  }

  export type SliderOrderByWithRelationInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    description?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SliderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SliderWhereInput | SliderWhereInput[]
    OR?: SliderWhereInput[]
    NOT?: SliderWhereInput | SliderWhereInput[]
    imageUrl?: StringFilter<"Slider"> | string
    title?: StringFilter<"Slider"> | string
    subtitle?: StringFilter<"Slider"> | string
    description?: StringFilter<"Slider"> | string
    active?: BoolFilter<"Slider"> | boolean
    createdAt?: DateTimeFilter<"Slider"> | Date | string
    updatedAt?: DateTimeFilter<"Slider"> | Date | string
  }, "id">

  export type SliderOrderByWithAggregationInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    description?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SliderCountOrderByAggregateInput
    _max?: SliderMaxOrderByAggregateInput
    _min?: SliderMinOrderByAggregateInput
  }

  export type SliderScalarWhereWithAggregatesInput = {
    AND?: SliderScalarWhereWithAggregatesInput | SliderScalarWhereWithAggregatesInput[]
    OR?: SliderScalarWhereWithAggregatesInput[]
    NOT?: SliderScalarWhereWithAggregatesInput | SliderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Slider"> | string
    imageUrl?: StringWithAggregatesFilter<"Slider"> | string
    title?: StringWithAggregatesFilter<"Slider"> | string
    subtitle?: StringWithAggregatesFilter<"Slider"> | string
    description?: StringWithAggregatesFilter<"Slider"> | string
    active?: BoolWithAggregatesFilter<"Slider"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Slider"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Slider"> | Date | string
  }

  export type BlogWhereInput = {
    AND?: BlogWhereInput | BlogWhereInput[]
    OR?: BlogWhereInput[]
    NOT?: BlogWhereInput | BlogWhereInput[]
    id?: StringFilter<"Blog"> | string
    imageUrl?: StringFilter<"Blog"> | string
    title?: StringFilter<"Blog"> | string
    subtitle?: StringFilter<"Blog"> | string
    description?: StringFilter<"Blog"> | string
    blogtext?: StringFilter<"Blog"> | string
    template?: StringFilter<"Blog"> | string
    english?: BoolFilter<"Blog"> | boolean
    active?: BoolFilter<"Blog"> | boolean
    createdAt?: DateTimeFilter<"Blog"> | Date | string
    updatedAt?: DateTimeFilter<"Blog"> | Date | string
  }

  export type BlogOrderByWithRelationInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    description?: SortOrder
    blogtext?: SortOrder
    template?: SortOrder
    english?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BlogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BlogWhereInput | BlogWhereInput[]
    OR?: BlogWhereInput[]
    NOT?: BlogWhereInput | BlogWhereInput[]
    imageUrl?: StringFilter<"Blog"> | string
    title?: StringFilter<"Blog"> | string
    subtitle?: StringFilter<"Blog"> | string
    description?: StringFilter<"Blog"> | string
    blogtext?: StringFilter<"Blog"> | string
    template?: StringFilter<"Blog"> | string
    english?: BoolFilter<"Blog"> | boolean
    active?: BoolFilter<"Blog"> | boolean
    createdAt?: DateTimeFilter<"Blog"> | Date | string
    updatedAt?: DateTimeFilter<"Blog"> | Date | string
  }, "id">

  export type BlogOrderByWithAggregationInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    description?: SortOrder
    blogtext?: SortOrder
    template?: SortOrder
    english?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BlogCountOrderByAggregateInput
    _max?: BlogMaxOrderByAggregateInput
    _min?: BlogMinOrderByAggregateInput
  }

  export type BlogScalarWhereWithAggregatesInput = {
    AND?: BlogScalarWhereWithAggregatesInput | BlogScalarWhereWithAggregatesInput[]
    OR?: BlogScalarWhereWithAggregatesInput[]
    NOT?: BlogScalarWhereWithAggregatesInput | BlogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Blog"> | string
    imageUrl?: StringWithAggregatesFilter<"Blog"> | string
    title?: StringWithAggregatesFilter<"Blog"> | string
    subtitle?: StringWithAggregatesFilter<"Blog"> | string
    description?: StringWithAggregatesFilter<"Blog"> | string
    blogtext?: StringWithAggregatesFilter<"Blog"> | string
    template?: StringWithAggregatesFilter<"Blog"> | string
    english?: BoolWithAggregatesFilter<"Blog"> | boolean
    active?: BoolWithAggregatesFilter<"Blog"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Blog"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Blog"> | Date | string
  }

  export type VisitorCreateInput = {
    id?: string
    count: number
    updatedAt: Date | string
  }

  export type VisitorUncheckedCreateInput = {
    id?: string
    count: number
    updatedAt: Date | string
  }

  export type VisitorUpdateInput = {
    count?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VisitorUncheckedUpdateInput = {
    count?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VisitorCreateManyInput = {
    id?: string
    count: number
    updatedAt: Date | string
  }

  export type VisitorUpdateManyMutationInput = {
    count?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VisitorUncheckedUpdateManyInput = {
    count?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BowsCreateInput = {
    id?: string
    images?: BowsCreateimagesInput | string[]
    name: string
    description: string
    available: string
    price: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type BowsUncheckedCreateInput = {
    id?: string
    images?: BowsCreateimagesInput | string[]
    name: string
    description: string
    available: string
    price: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type BowsUpdateInput = {
    images?: BowsUpdateimagesInput | string[]
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    available?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BowsUncheckedUpdateInput = {
    images?: BowsUpdateimagesInput | string[]
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    available?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BowsCreateManyInput = {
    id?: string
    images?: BowsCreateimagesInput | string[]
    name: string
    description: string
    available: string
    price: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type BowsUpdateManyMutationInput = {
    images?: BowsUpdateimagesInput | string[]
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    available?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BowsUncheckedUpdateManyInput = {
    images?: BowsUpdateimagesInput | string[]
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    available?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BassCreateInput = {
    id?: string
    images?: BassCreateimagesInput | string[]
    name: string
    description: string
    available: string
    price: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type BassUncheckedCreateInput = {
    id?: string
    images?: BassCreateimagesInput | string[]
    name: string
    description: string
    available: string
    price: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type BassUpdateInput = {
    images?: BassUpdateimagesInput | string[]
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    available?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BassUncheckedUpdateInput = {
    images?: BassUpdateimagesInput | string[]
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    available?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BassCreateManyInput = {
    id?: string
    images?: BassCreateimagesInput | string[]
    name: string
    description: string
    available: string
    price: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type BassUpdateManyMutationInput = {
    images?: BassUpdateimagesInput | string[]
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    available?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BassUncheckedUpdateManyInput = {
    images?: BassUpdateimagesInput | string[]
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    available?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SliderCreateInput = {
    id?: string
    imageUrl: string
    title: string
    subtitle: string
    description: string
    active: boolean
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type SliderUncheckedCreateInput = {
    id?: string
    imageUrl: string
    title: string
    subtitle: string
    description: string
    active: boolean
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type SliderUpdateInput = {
    imageUrl?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SliderUncheckedUpdateInput = {
    imageUrl?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SliderCreateManyInput = {
    id?: string
    imageUrl: string
    title: string
    subtitle: string
    description: string
    active: boolean
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type SliderUpdateManyMutationInput = {
    imageUrl?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SliderUncheckedUpdateManyInput = {
    imageUrl?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogCreateInput = {
    id?: string
    imageUrl: string
    title: string
    subtitle: string
    description: string
    blogtext: string
    template: string
    english?: boolean
    active: boolean
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type BlogUncheckedCreateInput = {
    id?: string
    imageUrl: string
    title: string
    subtitle: string
    description: string
    blogtext: string
    template: string
    english?: boolean
    active: boolean
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type BlogUpdateInput = {
    imageUrl?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    blogtext?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    english?: BoolFieldUpdateOperationsInput | boolean
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogUncheckedUpdateInput = {
    imageUrl?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    blogtext?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    english?: BoolFieldUpdateOperationsInput | boolean
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogCreateManyInput = {
    id?: string
    imageUrl: string
    title: string
    subtitle: string
    description: string
    blogtext: string
    template: string
    english?: boolean
    active: boolean
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type BlogUpdateManyMutationInput = {
    imageUrl?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    blogtext?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    english?: BoolFieldUpdateOperationsInput | boolean
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogUncheckedUpdateManyInput = {
    imageUrl?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    blogtext?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    english?: BoolFieldUpdateOperationsInput | boolean
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type VisitorCountOrderByAggregateInput = {
    id?: SortOrder
    count?: SortOrder
    updatedAt?: SortOrder
  }

  export type VisitorAvgOrderByAggregateInput = {
    count?: SortOrder
  }

  export type VisitorMaxOrderByAggregateInput = {
    id?: SortOrder
    count?: SortOrder
    updatedAt?: SortOrder
  }

  export type VisitorMinOrderByAggregateInput = {
    id?: SortOrder
    count?: SortOrder
    updatedAt?: SortOrder
  }

  export type VisitorSumOrderByAggregateInput = {
    count?: SortOrder
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

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BowsCountOrderByAggregateInput = {
    id?: SortOrder
    images?: SortOrder
    name?: SortOrder
    description?: SortOrder
    available?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BowsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    available?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BowsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    available?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BassCountOrderByAggregateInput = {
    id?: SortOrder
    images?: SortOrder
    name?: SortOrder
    description?: SortOrder
    available?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BassMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    available?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BassMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    available?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SliderCountOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    description?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SliderMaxOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    description?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SliderMinOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    description?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type BlogCountOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    description?: SortOrder
    blogtext?: SortOrder
    template?: SortOrder
    english?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BlogMaxOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    description?: SortOrder
    blogtext?: SortOrder
    template?: SortOrder
    english?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BlogMinOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    description?: SortOrder
    blogtext?: SortOrder
    template?: SortOrder
    english?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BowsCreateimagesInput = {
    set: string[]
  }

  export type BowsUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BassCreateimagesInput = {
    set: string[]
  }

  export type BassUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
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

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
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

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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