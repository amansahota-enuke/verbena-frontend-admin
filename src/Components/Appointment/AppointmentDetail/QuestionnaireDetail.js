import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

import statusConstants from "../../../constants/status.constants";
import selector from "../../../redux/selector";
import { QuestionnaireActions } from "../../../redux/slice/questionnaire.slice";
import Loader from "../../Common/Loader";

const QuestionnaireDetail = () => {
    const dispatch = useDispatch();
    const selectedAppointment = useSelector(selector.selectedAppointment);
    const questionnaireStatus = useSelector(selector.questionnaireStatus);
    const questionnaireAnswers = useSelector(selector.questionnaireAnswers);

    useEffect(() => {
        if (selectedAppointment.id) {
            dispatch(
                QuestionnaireActions.fetchQuestionnaireAnswers(
                    selectedAppointment.id
                )
            );
        }
    }, [selectedAppointment, dispatch]);

    const checkQuestion = (question) => {
        if (!question.parent_question_id) {
            return true;
        }
        const parentQuestion = questionnaireAnswers.find(
            (ele) => ele.id === question.parent_question_id
        );
        const answer = parentQuestion.patient_questionnaires.find(
            (response) =>
                response.answer_option_id === question.conditional_answer
        );
        if (answer) {
            return true;
        }
        return false;
    };

    return (
        <>
            {questionnaireStatus === statusConstants.PENDING && <Loader />}
            <Disclosure>
                {({ open }) => (
                    <>
                        <Disclosure.Button className="flex items-center justify-between w-full py-4 font-medium text-left rounded-t-lg rounded-r-lg rounded-b-none bg-white px-2 mb-0">
                            <h4 className="hepta-slab mb-0 font-32">
                                Questionnaire Details
                            </h4>
                            <ChevronDownIcon
                                className={`${
                                    open ? "transform rotate-180" : ""
                                } w-5 h-5 text-purple-500`}
                            />
                        </Disclosure.Button>
                        <Disclosure.Panel className="pb-2 text-sm">
                            <div className="bg-white mb-3">
                                {questionnaireAnswers.map((question) => {
                                    const showQuestion =
                                        checkQuestion(question);
                                    if (showQuestion) {
                                        return (
                                            <div
                                                key={question.id}
                                                className="health-info border-b-1"
                                            >
                                                <h3 className="font-18 dark-color px-4 py-0 mb-0 pt-3 calibre-bold">
                                                    {question.text}
                                                </h3>
                                                {question.patient_questionnaires
                                                    .length > 0 ? (
                                                    question.patient_questionnaires.map(
                                                        (response) => (
                                                            <p
                                                                key={
                                                                    response.id
                                                                }
                                                                className="font-16 px-4 py-0 mb-3 calibre-regular text-2x"
                                                            >
                                                                {response.answer_text
                                                                    ? response.answer_text
                                                                    : response
                                                                          .answer_option
                                                                          .text}
                                                            </p>
                                                        )
                                                    )
                                                ) : (
                                                    <p className="font-16 px-4 py-0 mb-3 calibre-regular text-2x">
                                                        No Response
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </>
    );
};

export default QuestionnaireDetail;
