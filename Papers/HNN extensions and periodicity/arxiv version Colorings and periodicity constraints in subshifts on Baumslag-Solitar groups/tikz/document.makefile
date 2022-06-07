ALL_FIGURE_NAMES=$(shell cat document.figlist)
ALL_FIGURES=$(ALL_FIGURE_NAMES:%=%.pdf)

allimages: $(ALL_FIGURES)
	@echo All images exist now. Use make -B to re-generate them.

FORCEREMAKE:

include $(ALL_FIGURE_NAMES:%=%.dep)

%.dep:
	mkdir -p "$(dir $@)"
	touch "$@" # will be filled later.

document-figure0.pdf: 
	pdflatex -halt-on-error -interaction=batchmode -jobname "document-figure0" "\def\tikzexternalrealjob{document}\input{document}"; convert -density 300 -transparent white "document-figure0.pdf" "document-figure0.png"

document-figure0.pdf: document-figure0.md5
