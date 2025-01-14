import { ActionCodeSettings } from '@firebase/auth';
export declare type EmailVerificationFormState = {
    error: string | undefined;
    inProgress: boolean;
    isComplete: boolean;
    submit: (actionCodeSettings?: ActionCodeSettings | null) => Promise<void>;
};
export declare const useEmailVerificationForm: () => EmailVerificationFormState;
export interface ForgotPasswordFormData {
    email: string;
}
export declare type ForgotPasswordFormState = {
    error: string | undefined;
    inProgress: boolean;
    isComplete: boolean;
    submit: (formData: ForgotPasswordFormData) => Promise<void>;
};
export declare const useForgotPasswordForm: () => ForgotPasswordFormState;
export interface PasswordLoginFormData {
    email: string;
    password: string;
}
export declare type PasswordLoginFormState = {
    error: string | undefined;
    inProgress: boolean;
    submit: (formData: PasswordLoginFormData) => Promise<void>;
};
export declare const usePasswordLoginForm: () => PasswordLoginFormState;
export interface PasswordRegistrationFormData {
    email: string;
    password: string;
    passwordConfirm: string;
}
export declare type PasswordRegistrationFormState = {
    error: string | undefined;
    inProgress: boolean;
    submit: (formData: PasswordRegistrationFormData) => Promise<void>;
};
export declare const usePasswordRegistrationForm: () => PasswordRegistrationFormState;
export interface ChangePasswordFormData {
    currentPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
}
export declare type ChangePasswordFormState = {
    error: string | undefined;
    inProgress: boolean;
    submit: (formData: ChangePasswordFormData) => Promise<void>;
};
export declare const useChangePasswordForm: () => ChangePasswordFormState;
export interface PasswordResetFormData {
    password: string;
    passwordConfirm: string;
}
export declare type PasswordResetFormState = {
    error: string | undefined;
    inProgress: boolean;
    submit: (formData: PasswordResetFormData) => Promise<void>;
};
export declare const usePasswordResetForm: (oobCode: string) => PasswordResetFormState;
