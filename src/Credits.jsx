import { useState } from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

function Credits() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button color='blue' onClick={() => setOpen(true)} circular className='fixed bottom-2 right-2' icon='question'></Button>
			<Modal
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				open={open}
			>
				<Modal.Header>Credits</Modal.Header>
				<Modal.Content>
					<Modal.Description>
						<p>
							Game made by EC<sup>3</sup>, specifically Du Yuancheng (2i2), Darryl Shi (2i2) and Yang An Yi (4A3)
							


							<br></br>
							<br></br>
							Commissioned by the NE Council
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