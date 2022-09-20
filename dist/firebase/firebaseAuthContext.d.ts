import { FirebaseError, FirebaseOptions } from 'firebase/app';
import { Auth, User } from 'firebase/auth';
import { FC, VFC } from 'react';
export declare type FirebaseAuthContextValue = {
    firebaseAuth: Auth;
    user: User | null;
    retrieveToken: (forceRefresh?: boolean) => Promise<string | undefined>;
    redirectError: FirebaseError | undefined;
};
export declare const useFirebaseAuthContext: () => FirebaseAuthContextValue;
export declare const useFirebaseAuthContextValue: (firebaseOptions: FirebaseOptions) => FirebaseAuthContextValue | null;
export declare type FirebaseAuthContextProviderProps = {
    firebaseOptions: FirebaseOptions;
    Loading?: VFC<Record<string, never>>;
};
export declare const FirebaseAuthContextProvider: FC<FirebaseAuthContextProviderProps>;
