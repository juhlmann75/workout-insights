import {useEffect, useState} from "react";
import {Button, Modal} from "flowbite-react";
import FileUpload from "./fileUpload";

export default function FileUploadModal() {
    const [mounted, setMounted] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <div className="flex items-center justify-center m-4">
            <Button onClick={() => setModalOpen(!modalOpen)}>
                Import New Workout Data
            </Button>
            <Modal show={modalOpen} onClose={() => setModalOpen(!modalOpen)}>
                <Modal.Header>
                    Import New Workout Data
                </Modal.Header>
                <Modal.Body>
                    <FileUpload myVar={modalOpen} setMyVar={setModalOpen}></FileUpload>
                </Modal.Body>
            </Modal>
        </div>
    )

}