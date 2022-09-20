var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { applyActionCode, confirmPasswordReset, createUserWithEmailAndPassword, linkWithCredential, reauthenticateWithCredential, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut, unlink, updateEmail, verifyPasswordResetCode, EmailAuthProvider, } from 'firebase/auth';
import { useCallback } from 'react';
import { useFirebaseAuthContext } from './firebaseAuthContext';
const wrapFirebaseAuthFunction = (firebaseAuth, func) => {
    const x = ((...args) => func(firebaseAuth, ...args));
    return x;
};
const useWrappedFirebaseAuthFunction = (func) => {
    const { firebaseAuth } = useFirebaseAuthContext();
    return wrapFirebaseAuthFunction(firebaseAuth, func);
};
export const useApplyActionCode = () => useWrappedFirebaseAuthFunction(applyActionCode);
export const useConfirmPasswordReset = () => useWrappedFirebaseAuthFunction(confirmPasswordReset);
export const useCreateUserWithEmailAndPassword = () => useWrappedFirebaseAuthFunction(createUserWithEmailAndPassword);
export const useLinkWithCredential = () => {
    const { user } = useFirebaseAuthContext();
    return useCallback((credential) => {
        if (!user) {
            throw new Error('User is not valid');
        }
        return linkWithCredential(user, credential);
    }, [user]);
};
export const useSendEmailVerification = () => {
    const { user } = useFirebaseAuthContext();
    return useCallback(() => {
        if (!user) {
            throw new Error('User is not valid');
        }
        return sendEmailVerification(user);
    }, [user]);
};
export const useSendPasswordResetEmail = () => useWrappedFirebaseAuthFunction(sendPasswordResetEmail);
export const useSignInWithEmailAndPassword = () => useWrappedFirebaseAuthFunction(signInWithEmailAndPassword);
export const useSignInWithPopup = () => useWrappedFirebaseAuthFunction(signInWithPopup);
export const useSignInWithRedirect = () => useWrappedFirebaseAuthFunction(signInWithRedirect);
export const useSignOut = () => useWrappedFirebaseAuthFunction(signOut);
export const useUpdateEmail = () => {
    const { user } = useFirebaseAuthContext();
    return useCallback((currentPassword, newEmail) => __awaiter(void 0, void 0, void 0, function* () {
        if (!user) {
            throw new Error('User is not valid');
        }
        if (!user.email) {
            throw new Error('User does not have an email address');
        }
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        yield reauthenticateWithCredential(user, credential);
        return updateEmail(user, newEmail);
    }), [user]);
};
export const useUnlink = () => {
    const { user } = useFirebaseAuthContext();
    return useCallback((providerId) => {
        if (!user) {
            throw new Error('User is not valid');
        }
        return unlink(user, providerId);
    }, [user]);
};
export const useVerifyPasswordResetCode = () => useWrappedFirebaseAuthFunction(verifyPasswordResetCode);
