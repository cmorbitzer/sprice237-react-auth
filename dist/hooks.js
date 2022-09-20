var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState } from 'react';
import { getFirebaseErrorMessage } from "./firebase/errors";
import { useConfirmPasswordReset, useCreateUserWithEmailAndPassword, useSendEmailVerification, useSendPasswordResetEmail, useSignInWithEmailAndPassword, useVerifyPasswordResetCode, } from "./firebase/firebaseAuthContextHooks";
export const useEmailVerificationForm = () => {
    const sendEmailVerification = useSendEmailVerification();
    const [inProgress, setInProgress] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [error, setError] = useState();
    const submit = () => __awaiter(void 0, void 0, void 0, function* () {
        setInProgress(true);
        setIsComplete(false);
        setError(undefined);
        try {
            yield sendEmailVerification();
            setIsComplete(true);
        }
        catch (e) {
            setError(getFirebaseErrorMessage(e));
        }
        finally {
            setInProgress(false);
        }
    });
    return { error, inProgress, isComplete, submit };
};
export const useForgotPasswordForm = () => {
    const sendPasswordResetEmail = useSendPasswordResetEmail();
    const [inProgress, setInProgress] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [error, setError] = useState();
    const submit = ({ email }) => __awaiter(void 0, void 0, void 0, function* () {
        setInProgress(true);
        setIsComplete(false);
        setError(undefined);
        try {
            yield sendPasswordResetEmail(email);
            setIsComplete(true);
        }
        catch (e) {
            setError(getFirebaseErrorMessage(e));
        }
        finally {
            setInProgress(false);
        }
    });
    return { error, inProgress, isComplete, submit };
};
export const usePasswordLoginForm = () => {
    const signInWithEmailAndPassword = useSignInWithEmailAndPassword();
    const [inProgress, setInProgress] = useState(false);
    const [error, setError] = useState();
    const submit = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
        setInProgress(true);
        setError(undefined);
        try {
            yield signInWithEmailAndPassword(email, password);
        }
        catch (e) {
            setError(getFirebaseErrorMessage(e));
        }
        finally {
            setInProgress(false);
        }
    });
    return { error, inProgress, submit };
};
export const usePasswordRegistrationForm = () => {
    const createUserWithEmailAndPassword = useCreateUserWithEmailAndPassword();
    const [inProgress, setInProgress] = useState(false);
    const [error, setError] = useState();
    const submit = ({ email, password, passwordConfirm }) => __awaiter(void 0, void 0, void 0, function* () {
        if (password !== passwordConfirm) {
            setError('Passwords do not match');
            return;
        }
        setInProgress(true);
        setError(undefined);
        try {
            yield createUserWithEmailAndPassword(email, password);
        }
        catch (e) {
            setError(getFirebaseErrorMessage(e));
        }
        finally {
            setInProgress(false);
        }
    });
    return { error, inProgress, submit };
};
export const usePasswordResetForm = (oobCode) => {
    const confirmPasswordReset = useConfirmPasswordReset();
    const signInWithEmailAndPassword = useSignInWithEmailAndPassword();
    const verifyPasswordResetCode = useVerifyPasswordResetCode();
    const [inProgress, setInProgress] = useState(false);
    const [error, setError] = useState();
    const submit = ({ password, passwordConfirm }) => __awaiter(void 0, void 0, void 0, function* () {
        if (password !== passwordConfirm) {
            setError('Passwords do not match');
            return;
        }
        setInProgress(true);
        setError(undefined);
        try {
            const email = yield verifyPasswordResetCode(oobCode);
            yield confirmPasswordReset(oobCode, password);
            yield signInWithEmailAndPassword(email, password);
        }
        catch (e) {
            setError(getFirebaseErrorMessage(e));
        }
        finally {
            setInProgress(false);
        }
    });
    return { error, inProgress, submit };
};
