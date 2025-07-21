import { 
  getAuth, 
  RecaptchaVerifier, 
  signInWithPhoneNumber,
  type ConfirmationResult,
  type UserCredential
} from "firebase/auth";
import firebaseApp from './Config.ts';

// Extend the Window interface to include recaptchaVerifier and confirmationResult
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: ConfirmationResult;
  }
  // Declare grecaptcha as provided by the reCAPTCHA script
  interface GReCaptcha {
    reset: (widgetId?: number) => void;
  }
  var grecaptcha: GReCaptcha | undefined;
}

// 1. Get the auth instance
const auth = getAuth(firebaseApp);

export const sendOtp = async (phoneNumber: string, verifier: RecaptchaVerifier): Promise<ConfirmationResult> => {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
    // SMS sent. Save confirmation result to resolve with the verification code.
    (window as Window).confirmationResult = confirmationResult;
    
    // It's good practice to reset the reCAPTCHA here.
    verifier.render().then((widgetId) => {
      if (grecaptcha && typeof grecaptcha.reset === 'function') {
        grecaptcha.reset(widgetId);
      }
    });

    return confirmationResult;
  } catch (error) {
    // It's good practice to reset the reCAPTCHA here on error as well.
    verifier.render().then((widgetId) => {
      if (grecaptcha && typeof grecaptcha.reset === 'function') {
        grecaptcha.reset(widgetId);
      }
    });
    console.error("Error sending OTP:", error);
    throw error;
  }
};

/**
 * 4. Verifies the OTP code entered by the user.
 * @param confirmationResult The result object from the sendOtp call.
 * @param otp The 6-digit code from the user.
 * @returns A promise that resolves with the UserCredential upon successful sign-in.
 */
export const verifyOtp = async (confirmationResult: ConfirmationResult, otp: string): Promise<UserCredential> => {
  try {
    const userCredential = await confirmationResult.confirm(otp);
    // User signed in successfully.
    return userCredential;
  } catch (error) {
    // User couldn't sign in (e.g., invalid code).
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

/**
 * Optional: Signs out the current user.
 */
export const signOutUser = (): Promise<void> => {
  return auth.signOut();
};