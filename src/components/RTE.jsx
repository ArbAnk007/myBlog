import { Editor } from "@tinymce/tinymce-react";
import { useForm, useController } from "react-hook-form";

function RTE({ control, name, defaultValue="" }) {

	const { field } = useController({
		name,
		control,
		rules: {required: true}
	})



	return ( 
		<div>
			<Editor
				apiKey="0gy4vp1swehsu0y43a0ghzqwkd4a5hzdmlncj5ovzavgk4on"
				initialValue={defaultValue}
				init={{
					height: 500,
					width: 1000,
					menubar: true,
					toolbar: 'undo redo | formatselect | ' +
					'bold italic backcolor | alignleft aligncenter ' +
					'alignright alignjustify | bullist numlist outdent indent | ' +
					'removeformat | help',
					content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
				}}
				onEditorChange={field.onChange}
			/>
		</div>
	 );
}

export default RTE;