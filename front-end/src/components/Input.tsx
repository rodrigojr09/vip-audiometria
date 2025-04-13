import React, { ChangeEvent } from "react";

type InputFieldProps = {
	label: string;
	name: string;
	value: string;
	onChange: (
		e: ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => void;
	type?: string;
	options?: string[];
	required?: boolean;
};

const Input: React.FC<InputFieldProps> = ({
	label,
	name,
	value,
	onChange,
	type = "text",
	options,
	required = true,
}) => {
	return (
		<div className="flex flex-col gap-2">
			<label htmlFor={name} className="text-sm font-medium text-gray-200">
				{label}
			</label>
			{type === "select" && (
				<select
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					className="border border-vip bg-gray-800 p-2 rounded w-full text-white focus:outline-none focus:ring-2 focus:ring-vip"
					required={required}
				>
					<option value={""}>{label}</option>
					{options?.map((option, index) => (
						<option key={index} value={option}>
							{option.charAt(0).toUpperCase() + option.slice(1)}
						</option>
					))}
				</select>
			)}
			{(type === "text" || type === "date") && (
				<input
					id={name}
					type={type}
					name={name}
					value={value}
					onChange={onChange}
					className="border border-vip bg-gray-800 p-2 rounded w-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-vip"
					placeholder={label}
					required={required}
				/>
			)}
			{type === "area" && (
				<textarea
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					className="border border-vip bg-gray-800 p-2 rounded w-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-vip"
					placeholder={label}
					required={required}
				></textarea>
			)}
		</div>
	);
};

export default Input;
