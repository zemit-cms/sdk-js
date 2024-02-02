import ZemitMessage from '@/types/validation-message.type';
import GetView from '@/types/auth/get-view.type';
export default interface LogoutView extends GetView {
    loggedIn: boolean;
    loggedInAs: boolean;
    messages: Array<ZemitMessage>;
    saved: boolean;
}
//# sourceMappingURL=logout-view.type.d.ts.map