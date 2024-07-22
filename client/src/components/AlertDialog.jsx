import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

<<<<<<< HEAD
export function AlertDialogs({ open, onClose, onConfirm }) {
=======
export function AlertDialogs({ open, onClose, onConfirm, content }) {
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
<<<<<<< HEAD
                        This action cannot be undone. This will permanently transfer funds to another account.
=======
                       {content}
>>>>>>> ed0f313f6802d2fa1f1e59da9eebb3ead8992eab
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
