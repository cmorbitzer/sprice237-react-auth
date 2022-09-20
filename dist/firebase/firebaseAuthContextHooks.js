var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { applyActionCode, confirmPasswordReset, createUserWithEmailAndPassword, linkWithCredential, reauthenticateWithCredential, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut, unlink, updateEmail, updatePassword, verifyPasswordResetCode, EmailAuthProvider, } from 'firebase/auth';
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
    const { rawUser } = useFirebaseAuthContext();
    return useCallback((credential) => {
        if (!rawUser) {
            throw new Error('User is not valid');
        }
        return linkWithCredential(rawUser, credential);
    }, [rawUser]);
};
export const useSendEmailVerification = () => {
    const { rawUser } = useFirebaseAuthContext();
    return useCallback((actionCodeSettings) => {
        if (!rawUser) {
            throw new Error('User is not valid');
        }
        return sendEmailVerification(rawUser, actionCodeSettings);
    }, [rawUser]);
};
export const useSendPasswordResetEmail = () => useWrappedFirebaseAuthFunction(sendPasswordResetEmail);
export const useSignInWithEmailAndPassword = () => useWrappedFirebaseAuthFunction(signInWithEmailAndPassword);
export const useSignInWithPopup = () => useWrappedFirebaseAuthFunction(signInWithPopup);
export const useSignInWithRedirect = () => useWrappedFirebaseAuthFunction(signInWithRedirect);
export const useSignOut = () => useWrappedFirebaseAuthFunction(signOut);
export const useUpdateEmail = () => {
    const { rawUser } = useFirebaseAuthContext();
    return useCallback((currentPassword, newEmail) => __awaiter(void 0, void 0, void 0, function* () {
        if (!rawUser) {
            throw new Error('User is not valid');
        }
        if (!rawUser.email) {
            throw new Error('User does not have an email address');
        }
        const credential = EmailAuthProvider.credential(rawUser.email, currentPassword);
        yield reauthenticateWithCredential(rawUser, credential);
        return updateEmail(rawUser, newEmail);
    }), [rawUser]);
};
export const useUpdatePassword = () => {
    const { rawUser } = useFirebaseAuthContext();
    return useCallback((currentPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
        if (!rawUser) {
            throw new Error('User is not valid');
        }
        if (!rawUser.email) {
            throw new Error('User does not have an email address');
        }
        const credential = EmailAuthProvider.credential(rawUser.email, currentPassword);
        yield reauthenticateWithCredential(rawUser, credential);
        return updatePassword(rawUser, newPassword);
    }), [rawUser]);
};
export const useUnlink = () => {
    const { rawUser } = useFirebaseAuthContext();
    return useCallback((providerId) => {
        if (!rawUser) {
            throw new Error('User is not valid');
        }
        return unlink(rawUser, providerId);
    }, [rawUser]);
};
export const useVerifyPasswordResetCode = () => useWrappedFirebaseAuthFunction(verifyPasswordResetCode);
