import Form from "react-bootstrap/Form";

const FormRow = ({ inputId, label, value, handleChange, options }) => {
    const renderSelectOptions = (prompt, selectOptions) => {
        const result = [];
        result.push(<option key="prompt">{prompt}</option>);
        selectOptions.forEach((opt) =>
            result.push(
                <option key={opt.value} value={opt.value}>
                    {opt.text}
                </option>
            )
        );
        return result;
    };
    const renderControl = () => {
        if (options.type === "select") {
            return (
                <Form.Select id={inputId} value={value} onChange={handleChange}>
                    {renderSelectOptions(
                        options.selectPrompt,
                        options.selectOptions
                    )}
                </Form.Select>
            );
        } else {
            return (
                <Form.Control
                    id={inputId}
                    value={value}
                    onChange={handleChange}
                    {...options}
                ></Form.Control>
            );
        }
    };

    return (
        <Form.Group className="mb-3">
            <Form.Label htmlFor={inputId}>{label}</Form.Label>
            {renderControl()}
        </Form.Group>
    );
};

export default FormRow;
