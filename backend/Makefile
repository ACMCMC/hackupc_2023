SHELL = /bin/bash
CC = go
PROGS = compile
OUT = main.o

all: $(PROGS)

# To Compile the Go Binary
compile:
	$(CC) build -o $(OUT) main.go

# Running the Go Binary
run: compile
	./$(OUT)

# If Go Binary exists, clean it
clean:
ifneq (,$(wildcard ./$(OUT)))
	rm ./$(OUT)
endif
