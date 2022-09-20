var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { initializeApp } from 'firebase/app';
import { getAuth, onIdTokenChanged, getRedirectResult } from 'firebase/auth';
import { createContext, useContext, useEffect, useMemo, useState, useCallback, } from 'react';
import { isFirebaseError } from "./errors";
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const FirebaseAuthContext = createContext(null);
FirebaseAuthContext.displayName = 'FirebaseAuthContext';
export const useFirebaseAuthContext = () => useContext(FirebaseAuthContext);
export const useFirebaseAuthContextValue = (firebaseOptions) => {
    const [firebaseApp, setFirebaseApp] = useState();
    // undefined means user state hasn't been retrieved yet, null means user state has been retrieved and there is no user
    const [user, setUser] = useState();
    const [redirectError, setRedirectError] = useState();
    const retrieveToken = useCallback((forceRefresh) => __awaiter(void 0, void 0, void 0, function* () { return yield (user === null || user === void 0 ? void 0 : user.getIdToken(forceRefresh)); }), [user]);
    const firebaseAuth = useMemo(() => (firebaseApp ? getAuth(firebaseApp) : undefined), [firebaseApp]);
    useEffect(() => {
        setFirebaseApp(initializeApp(firebaseOptions));
        return () => {
            setFirebaseApp(undefined);
        };
    }, [firebaseOptions]);
    useEffect(() => {
        if (!firebaseAuth || !getRedirectResult) {
            return;
        }
        getRedirectResult(firebaseAuth).catch((e) => {
            if (!isFirebaseError(e)) {
                throw e;
            }
            setRedirectError(e);
        });
        const unsubscriber = onIdTokenChanged(firebaseAuth, (newUser) => {
            setUser(newUser);
        });
        return () => {
            setUser(undefined);
            unsubscriber();
        };
    }, [firebaseAuth]);
    if (!firebaseAuth || user === undefined) {
        return null;
    }
    return { firebaseAuth, user, retrieveToken, redirectError };
};
export const FirebaseAuthContextProvider = ({ firebaseOptions, children, Loading, }) => {
    const contextValue = useFirebaseAuthContextValue(firebaseOptions);
    if (!contextValue) {
        if (Loading) {
            return _jsx(Loading, {}, void 0);
        }
        return null;
    }
    return (_jsx(FirebaseAuthContext.Provider, Object.assign({ value: contextValue }, { children: children }), void 0));
};
