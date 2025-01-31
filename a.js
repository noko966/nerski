createOverlayControl(params) {
    const [
        label,
        parent,
        checkboxCallback,
        pickerCallback,
        customRadiusCb,
        hideConfigArray,
    ] = params;
    let t = this;
    let verbalData = this.verbalData(label);

    let _label = document.createElement("button");
    _label.className = "nik_skinner_control_collapse_collapser";
    let _labelSpan = document.createElement("span");
    let _labelArrow = document.createElement("div");
    _labelArrow.className = "skinner_ico_arrow";

    _labelSpan.innerText = this.labelsMap[label]
        ? this.labelsMap[label]
        : label;
    _label.appendChild(_labelSpan);
    // _label.appendChild(_labelArrow);

    let pickerMainColor = this.skin[label + "Bg"];

    let wrapper = document.createElement("div");
    wrapper.className = "nik_skinner_control_group";
    this.essenceGroups[label] = wrapper;

    let ddContent = document.createElement("div");
    ddContent.className = "nik_skinner_control_collapse_content";

    // _label.addEventListener("click", () => {
    //     _label.classList.toggle("nik_skinner_control_collapse_collapser-open");
    //     ddContent.classList.toggle("nik_skinner_control_collapse_content-show");
    //     _labelArrow.classList.toggle("skinner_ico_arrow-rotated");
    // });
    let isEnabledChb;
    let chb = this.createCheckBox(label);
    isEnabledChb = chb.checkbox;

    const onEnableChange = function (e) {
        checkboxCallback(e);
        t.modifyKey(
            verbalData.nameBg,
            tinycolor(t[verbalData.nameBg].picker.style.background).toHexString()
        );
    };

    isEnabledChb.addEventListener("change", onEnableChange);

    this.eventListeners.push({
        element: isEnabledChb,
        type: "change",
        listener: onEnableChange,
    });

    let labelWrapper = document.createElement("div");
    labelWrapper.className = "skn_controls_row";

    labelWrapper.appendChild(chb.label);
    labelWrapper.appendChild(_label);
    wrapper.appendChild(labelWrapper);
    wrapper.appendChild(ddContent);

    //main color

    let isEnabledControl, isEnabledPckr;
    {
        //isEnabledPckrDiv = this.createDiv("nik_skinner_control_group_picker");
        isEnabledControl = this.createDiv(
            "nik_skinner_checkbox_wrapper state_delay_1"
        );

        ddContent.appendChild(isEnabledControl);
        isEnabledControl.appendChild(
            this.createSpan(this.classNames.uiLabelSm, this.labelsMap.background)
        );

        isEnabledPckr = this.createColorBox(
            pickerMainColor,
            "nik_skinner_control_group_picker",
            pickerCallback
        );
        isEnabledControl.appendChild(isEnabledPckr);
    }


    

   

    //custom roundness

    let radiusControl, radiusInput, radiusAmount;
    if (customRadiusCb) {
        radiusControl = this.createDiv(
            "nik_skinner_checkbox_wrapper nik_skinner_checkbox_wrapper-range"
        );
        radiusInput = document.createElement("input");
        radiusInput.type = "range";
        radiusInput.min = 0;
        radiusInput.max = 100;
        radiusAmount = document.createElement("input");
        radiusAmount.type = "number";
        radiusAmount.className = "nik_skinner_radius_amount";

        const onRadiusRangeInput = function (e) {
            radiusAmount.value = e.target.value;
            customRadiusCb(e);
        };

        const onRadiusInputInput = function (e) {
            radiusInput.value = e.target.value;
            customRadiusCb(e);
        };

        radiusInput.addEventListener("input", onRadiusRangeInput);

        radiusAmount.addEventListener("input", onRadiusInputInput);
        ddContent.appendChild(radiusControl);
        radiusControl.appendChild(
            this.createSpan(this.classNames.uiLabelSm, this.labelsMap.radius)
        );

        radiusControl.appendChild(radiusInput);
        radiusControl.appendChild(radiusAmount);

        this.eventListeners.push({
            element: radiusInput,
            type: "input",
            listener: onRadiusRangeInput,
        });
        this.eventListeners.push({
            element: radiusAmount,
            type: "input",
            listener: onRadiusInputInput,
        });
    }

    let _hideConfigArray = hideConfigArray || [];

    const configMap = {
        background: isEnabledControl,
        gradient: isGradientEnabledControl,
        text: isCustomTextControl,
        accent: customAccentControl,
        border: borderControl,
        radius: radiusControl,
    };

    parent.appendChild(wrapper);

    _hideConfigArray.forEach((config) => {
        const el = configMap[config];
        if (!el) return console.warn(config + " not found in map");
        el.classList.add("nik-hidden");
    });

    return {
        checkBox: isEnabledChb,
        picker: bgPicker,
        blurAmount: blurAmount,
    };
}