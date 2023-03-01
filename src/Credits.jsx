import { useState } from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

function Credits() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setOpen(true)}></Button>
			<Modal
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				open={open}
			>
				<Modal.Header>Credits</Modal.Header>
				<Modal.Content>
					<Modal.Description>
						<Header>Default Profile Image</Header>
						<p>
						Credits
						</p>
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button color='black' onClick={() => setOpen(false)}>
          Close
					</Button>
				</Modal.Actions>
			</Modal>
		</>
	);
}

export default Credits;