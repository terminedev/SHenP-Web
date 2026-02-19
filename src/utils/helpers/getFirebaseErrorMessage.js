export const getFirebaseErrorMessage = (errorCode) => {
    switch (errorCode) {

        // --- REGISTRO DE USUARIOS ---

        case 'auth/email-already-in-use':
            return 'Este correo electrónico ya está registrado. Intenta iniciar sesión.';

        case 'auth/weak-password':
            return 'La contraseña es muy débil. Debe tener al menos 6 caracteres.';

        case 'auth/operation-not-allowed':
            return 'El método de registro seleccionado no está habilitado. Contacta al soporte.';

        case 'auth/account-exists-with-different-credential':
            return 'Ya existe una cuenta con este correo, pero fue creada con otro método (Google, Facebook, etc.).';

        case 'auth/credential-already-in-use':
            return 'Esta cuenta (Google/Facebook) ya está vinculada a otro usuario.';

        // --- INICIO DE SESIÓN / AUTENTICACIÓN ---

        case 'auth/invalid-email':
            return 'El formato del correo electrónico no es válido.';

        case 'auth/user-disabled':
            return 'Esta cuenta ha sido deshabilitada por el administrador.';

        case 'auth/user-not-found':
            return 'No encontramos ninguna cuenta asociada a este correo.';

        case 'auth/wrong-password':
            return 'La contraseña es incorrecta. Inténtalo de nuevo.';

        case 'auth/invalid-credential':
            return 'Las credenciales no son válidas o han expirado.';

        case 'auth/requires-recent-login':
            return 'Por seguridad, necesitas volver a iniciar sesión para realizar esta acción.';

        case 'auth/popup-closed-by-user':
            return 'El proceso de inicio de sesión fue cancelado antes de terminar.';

        case 'auth/popup-blocked':
            return 'El navegador bloqueó la ventana emergente. Por favor, permítela e inténtalo de nuevo.';

        // --- PROTECCIÓN Y LÍMITES ---

        case 'auth/too-many-requests':
            return 'Demasiados intentos fallidos. Por favor, espera unos minutos e inténtalo de nuevo.';

        // --- ERRORES DE SISTEMA / RED ---

        case 'auth/network-request-failed':
            return 'Error de conexión. Por favor, revisa tu conexión a internet.';

        case 'auth/internal-error':
            return 'Ocurrió un error interno en el servidor. Inténtalo más tarde.';

        case 'unavailable':
            return 'El servicio está temporalmente no disponible.';

        // --- CERRAR SESIÓN / SESIÓN EXPIRADA ---

        case 'auth/no-current-user':
            return 'No hay ninguna sesión activa actualmente.';

        case 'auth/user-token-expired':
            return 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.';

        case 'auth/user-signed-out':
            return 'El usuario ha cerrado la sesión.';

        // --- FIRESTORE (Base de Datos / addDoc / setDoc) ---

        case 'permission-denied':
            return 'No tienes permisos para realizar esta acción (Reglas de seguridad).';

        case 'resource-exhausted':
            return 'Se ha superado la cuota de uso o el límite de almacenamiento.';

        case 'cancelled':
            return 'La operación fue cancelada.';

        case 'data-loss':
            return 'Hubo una pérdida de datos irrecuperable.';

        case 'deadline-exceeded':
            return 'La operación tardó demasiado tiempo en responder. Revisa tu conexión.';

        case 'aborted':
            return 'La operación fue abortada (posible conflicto con otra transacción).';

        case 'out-of-range':
            return 'Se intentó guardar un valor fuera del rango válido.';

        case 'failed-precondition':
            return 'Error de requisitos previos (posible falta de índice o estado inválido).';

        case 'invalid-argument':
            return 'Se enviaron datos inválidos o incorrectos a la base de datos.';

        // --- OBTENCIÓN Y LISTADO DE DATOS (Firestore / Storage) ---

        case 'not-found':
            return 'El registro o documento que buscas no existe.';

        case 'unauthenticated':
            return 'Debes iniciar sesión para consultar esta información.';

        case 'storage/object-not-found':
            return 'El archivo que intentas obtener no se encuentra en el servidor.';

        case 'storage/unauthorized':
            return 'No tienes permisos para ver o descargar este archivo.';

        case 'storage/canceled':
            return 'La descarga o lectura del archivo fue cancelada.';

        case 'storage/unknown':
            return 'Ocurrió un error desconocido al intentar obtener el archivo.';

        // --- DEFAULT (Fallback) ---
        default:
            console.warn('Error de Firebase no controlado:', errorCode);
            return 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
    }
};